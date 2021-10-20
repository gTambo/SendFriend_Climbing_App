const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const aws = require('aws-sdk');
const sharp = require('sharp');

/**
 * GET climbs from specified gym with specified style
 */
router.get('/:gymId/:styleId', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('getting all climbs for Gym: ', req.params.gymId, 'of style: ', req.params.styleId);
  console.log("req.user: ", req.user);
  console.log('Params: ', req.params);
  const query = `
        SELECT "climbs"."id", "grade"."difficulty", "color", "photo", "movement_style" FROM "climbs" 
        JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
        WHERE "gym_id" = $1 AND "climb_style_id" = $2
        GROUP BY "climbs"."id", "grade"."id", "grade"."difficulty", "color", "photo"
        ORDER BY "grade"."id", "climbs"."id" ASC;
    `;

  pool.query((query), [req.params.gymId, req.params.styleId])
  .then( (result) => {
    console.log('Sending back: ', result.rows); // Show me what I got
    res.send(result.rows)
  }).catch(error => {
      console.log('Error getting climbs: ', error);
      res.sendStatus(500);
  });
});

/**
 * GET all the climb styles
 */
router.get('/grades', rejectUnauthenticated, (req, res) => {
    // We'll just take all the grades
    //  TO DO: limit grades by boulder or rope, once client can send specifics
    console.log('Getting grades', req.params);
    const query = `SELECT * FROM "grade";`;
    pool.query(query).then( (result) => {
        console.log('Sending grades from DB: ', result.rows); // let's see 'em
        res.send(result.rows);
    }).catch((err) => { // uh-oh
        console.log('There was an error getting grades: ', err);
        res.sendStatus(500);
    });
});


const { S3_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
aws.config.region = AWS_REGION;
aws.config.update({
   accessKeyId: AWS_ACCESS_KEY_ID,
   secretAccessKey: AWS_SECRET_ACCESS_KEY
});
/**
 * POST new climb
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  if (!S3_BUCKET || !AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
        res.status(500).send('Missing environment variables for AWS bucket.');
        return;
    }
    console.log('Posting new climb: ', req.body);
    console.log('User: ', req.user);
    const query = `INSERT INTO "climbs" 
	("grade_id", "color", "gym_id", "climb_style_id", "photo", "movement_style", "user_id")
    VALUES
	($1, $2, $3, $4, $5, $6, $7) 
    RETURNING "id";
`;
pool.query((query), [
        req.body.grade_id, // $1
        req.body.color, // $2
        req.body.gym_id, // $3
        req.body.climb_style_id, // $4
        req.body.photo, // $5
        req.body.movement_style, // $6
        req.user.id // $7
    ]).then((result) => {
        console.log("result: ", result);
        res.send(result.rows[0]);
    }).catch((err) => {
        console.log('Error in post: ', err);
        res.sendStatus(500);
    })
});

/**
 * S3 BUCKET HERE
 */


 /**
  * @api {post} /s3 Upload Photo
  * @apiPermission user
  * @apiName PostPhoto
  * @apiGroup Photo
  * @apiDescription This route uploads a photo.
  *
  * @apiParam {String} name              Mandatory image file name.
  * @apiParam {String} type              Mandatory image file type.
  * @apiParam {String} size              Mandatory image file size.
  * @apiParam {File}   image             Mandatory image
  *
  * @apiSuccessExample {json} Success-Response:
  *      HTTP/1.1 201 OK
  */
 router.put('/s3', rejectUnauthenticated, async (req, res) => {
     console.log("in s3 router");
     if (!S3_BUCKET || !AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
         res.status(500).send('Missing environment variables for AWS bucket.');
         return;
     }
     try {
        //  console.log("request", req);
        //  console.log('req Query: ', req.query);
        console.log('req.BODY ', req.body);
        const imageProps = req.query;
        const imageData = req.files.image.data;
        const climbId = req.body.climbId;
        console.log('imageData', imageData);
        console.log('climb Id: ', climbId);
        const mediumKey = `photos/medium/${imageProps.name}`;
        // Optionally, resize the image
        const mediumFileContent = await sharp(imageData).resize(300, 300).toBuffer();
 
        // Setting up S3 upload parameters
        const params = {
            Bucket: S3_BUCKET,
            Key: mediumKey,
            Body: mediumFileContent,
            ACL: 'public-read',
        };
        const s3 = new aws.S3();
        // Uploading files to the bucket
        const data = await s3.upload(params).promise();
 
        // Optionally, create a thumbnail
        const thumbFileConent = await sharp(imageData).resize(100, 100).toBuffer();
        const thumbKey = `photos/thumb/${req.user.id}/${imageProps.name}`;
        params.Key = thumbKey;
        params.Body = thumbFileConent;
        await s3.upload(params).promise();
 
        // INSERT photo path into the database
        await pool.query((`UPDATE "climbs" SET ("thumb_url", "photo") = ($1, $2) WHERE "id" = $3;`), [
            `https://climbtags1.s3.amazonaws.com/${thumbKey}`,
            `https://climbtags1.s3.amazonaws.com/${mediumKey}`,
            climbId
        ]);
        
        console.log('sending data somewhere:', data);
        // Send back medium image data.
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
 
router.post('/photourl', (req, res) => {
    const query = `INSERT INTO "climbs" ("photo") VALUES ($1);`
    pool.query(query, [req.body.selectedFile])
    .then(results => {
        console.log('Photo url from s3bucket: ', results);
        res.sendStatus(200);
    });
    // to do; write catch
});

/**
 * PUT route template
 * 
 */
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('Params: ', req.params.id);
    console.log('Body: ', req.body);
    const climbToEdit = req.params.id;
    const query = `
            UPDATE "climbs" SET 
            ("grade_id", "color", "gym_id", "climb_style_id", "photo", "movement_style")
            =
	        ($1, $2, $3, $4, $5, $6)
            WHERE "id" = $7;
        `;
    pool.query((query), [
        req.body.grade_id, // $1
        req.body.color, // $2
        req.body.gym_id, // $3
        req.body.climb_style_id, // $4
        req.body.photo, // $5
        req.body.movement_style, // $6
        climbToEdit // $7
    ]).then( results => {
        console.log('PUT result: ', results.rows);
        res.sendStatus(200)
        res.send(results.rows);
    }).catch(error => {
        console.log('ERROR in edit climb', error);
        res.sendStatus(500);
    });
});

/**
 * DELETE route template
 */
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
    //  DELETE route code here
    console.log('DELETE Params(climb Id) and user id: ', req.params, req.user.id);
    const idToDelete = req.params.id;
    const deleteComments = `DELETE FROM "comment" WHERE "climb_id" = $1;`;
    pool.query((deleteComments), [idToDelete]).then(dCResult => { 

        console.log('DELETED Comments for climb: ', idToDelete, dCResult.rowCount);
        const deleteRating = `DELETE FROM "rating" WHERE "climb_id" = $1;`;
        pool.query((deleteRating), [idToDelete]).then(dRResult=> {

            console.log('DELETED Ratings for climb: ', idToDelete, dRResult.rowCount);
            const deleteQuery = `DELETE FROM "climbs" WHERE "id" = $1;`;
            pool.query((deleteQuery), [req.params.id]).then( (result) => {
                console.log('DELETEd Climb:',idToDelete, result.rowCount);
                if (result.rowCount > 0) {
                    // we deleted something
                    res.send({rowCount: result.rowCount, message: 'You deleted the climb!'})
                } else {
                    // we did not delete anything
                    res.send({rowCount: result.rowCount, message: 'Nothing was deleted. Climbs may only be deleted by the original poster or an admin.'})
                }
            
            }).catch(error => {
                console.log('ERROR in DELETE Climb ', error);
                res.sendStatus(500);
            })
        }).catch(error => {
            console.log('ERROR in DELETE Ratings ', error);
            res.sendStatus(500);
        })
    }).catch(error => {
        console.log('ERROR in DELETE Comments ' ,error);
        res.sendStatus(500);
    });
});



module.exports = router;
