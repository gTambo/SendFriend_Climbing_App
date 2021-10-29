const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const aws = require('aws-sdk');
const sharp = require('sharp');

/**
 * @api {get} /climbs/:gymId/:styleId Request list of climbs for specified gym and climbing style
 * @apiName GetClimbs
 * @apiGroup Climbs
 *
 * @apiParam {Number} gymId Climbing gym's unique Id.
 * @apiParam {Number} styleId A climbing style's unique Id
 * 
 * @apiSuccess {Object[]} climbs An array of climbs.
 * @apiSuccess {Number} climb.id  The unique id for the climb.
 * @apiSuccess {String} climb.difficulty The grade of the climb.
 * @apiSuccess {Number} climb.grade_id The id of the grade of the climb.
 * @apiSuccess {String} climb.color Color of the climb.
 * @apiSuccess {String} climb.photo Meduim sized photo fo the climb.
 * @apiSuccess {String} climb.thumb_url Thumbain photo of the climb.
 * @apiSuccess {String} climb.movement_style 
 * @apiSuccess {String} climb.name
 * @apiSuccess {String} climb.style
 */
router.get('/:gymId/:styleId', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('getting all climbs for Gym:', req.params.gymId, 'of style:', req.params.styleId);
//   console.log("req.user: ", req.user);
//   console.log('Params: ', req.params);
  const query = `
                SELECT "climbs"."id", "grade"."difficulty", "grade_id", "color", "photo", "thumb_url", "movement_style", 
                        "gym"."name", "climb_style"."style" 
                FROM "climbs" 
                JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
                JOIN "gym" ON "climbs"."gym_id" = "gym"."id"
                JOIN "climb_style" ON "climbs"."climb_style_id" = "climb_style"."id"
                WHERE "gym_id" = $1 AND "climb_style_id" = $2 AND "is_archived"  = 'FALSE'
                GROUP BY "climbs"."id", "grade"."difficulty", "color", "photo", "gym"."name", "climb_style"."style", "grade_id"
                ORDER BY "grade_id" ASC;
    `;

  pool.query((query), [req.params.gymId, req.params.styleId])
  .then( (result) => {
    console.log('Sending back:', result.rowCount, 'rows'); // Show me how many I got
    res.send(result.rows)
  }).catch(error => {
      console.log('Error getting climbs: ', error);
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
 * @api {post} /climbs Add a climb
 * @apiName AddClimb
 * @apiGroup Climbs
 *
 * @apiSuccessExample {json} Success-Response:
  *      HTTP/1.1 201 OK
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
  * @api {put} /s3 Upload Photo
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
  *      HTTP/1.1 200 OK
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
        const mediumKey = `photos/medium/${req.user.id}/${imageProps.name}`;
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
        // 
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
 

/**
 * @api {put} /climbs/edit/:id Edit a climb of a specified ID.
 * @apiName EditClimb
 * @apiGroup Climbs
 *
 * @apiParam {Number} id Unique ID of the climb to update.
 * 
 * @apiSuccessExample {json} Success-Response:
  *      HTTP/1.1 200 OK
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
        console.log('PUT result: ', results);
        res.sendStatus(200)
        // res.send(results.rows);
    }).catch(error => {
        console.log('ERROR in edit climb', error);
        res.sendStatus(500);
    });
});

/**
 * @api {delete} /climbs/:id Delete a climb of a specified ID.
 * @apiName DeleteClimb
 * @apiGroup Climbs
 *
 * @apiParam {Number} id Unique ID of the climb to delete.
 * 
 * @apiSuccessExample {json} Success-Response:
  *      HTTP/1.1 204 OK
 */
 router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    //  DELETE route code here
    try{ console.log('DELETE Params(climb Id) and user id: ', req.params, req.user.id);
        const idToDelete = req.params.id;
        const deleteComments = `DELETE FROM "comment" WHERE "climb_id" = $1;`;
        await pool.query((deleteComments), [idToDelete]);
        // CONSIDER Delete cascade, or a "soft delete" / archive
        // console.log('DELETED Comments for climb: ', idToDelete, dCResult.rowCount);
        const deleteRating = `DELETE FROM "rating" WHERE "climb_id" = $1;`;
        await pool.query((deleteRating), [idToDelete])

        // console.log('DELETED Ratings for climb: ', idToDelete, dRResult.rowCount);
        const deleteQuery = `DELETE FROM "climbs" WHERE "id" = $1;`;
        await pool.query((deleteQuery), [req.params.id]);
        // console.log('Delete response: ', response);
        // console.log('DELETEd Climb:',idToDelete, result.rowCount);
        // if (result.rowCount > 0) {
        //     // we deleted something
        //     res.send({rCount: result.rowCount, message: 'You deleted the climb!'})
        // } else {
        //     // we did not delete anything
        //     res.send({rCount: result.rowCount, message: 'Nothing was deleted. Climbs may only be deleted by the original poster or an admin.'})
        // }
        console.log('END OF DELETE CLIMB', idToDelete );
    } catch (error) {
        console.log('ERROR in DELETE Climb ', error);
        next(error);
        res.sendStatus(500);
    }
});
    //     }).catch(error => {
    //         console.log('ERROR in DELETE Ratings ', error);
    //         res.sendStatus(500);
    //     })
    // }).catch(error => {
    //     console.log('ERROR in DELETE Comments ' ,error);
    //     res.sendStatus(500);
    // });
// });



module.exports = router;
