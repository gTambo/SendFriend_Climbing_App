const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET climbs from specified gym with specified style
 */
router.get('/:gymId/:styleId', rejectUnauthenticated, (req, res) => {
  // GET route code here
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

/**
 * POST new climb
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
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
        res.send(result.rows);
    }).catch((err) => {
        console.log('Error in post: ', err);
        res.sendStatus(500);
    })
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

    })
});

/**
 * DELETE route template
 */
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
    //  DELETE route code here
    console.log('DELETE Params(climb Id) and user id: ', req.params, req.user.id);
    const idToDelete = req.params.id;
    const deleteComments = `DELETE FROM "comments" WHERE "id" = $1;`;
    pool.query((deleteComments), [idToDelete]).then(dCResult => { 
        const deleteRating = `DELETE FROM "rating" WHERE "climb_id" = $1;`;
        pool.query((deleteRating), [idToDelete]).then(dRResult=> {
            const deleteQuery = `DELETE FROM "climbs" WHERE "id" = $1;`;
            pool.query((deleteQuery), [req.params.id]).then( (result) => {
                console.log('DELETE result: ',result);
                if (result.rowCount > 0) {
                    // we deleted something
                    res.send({message: 'You deleted the climb!'})
                } else {
                    // we did not delete anything
                    res.send({ message: 'Nothing was deleted. Climbs may only be deleted by the original poster or an admin.'})
                }
            
            }).catch(error => {
                res.sendStatus(500);
        })
    }).catch(error => {
            res.sendStatus(500);
    })
}).catch(error => {
    res.sendStatus(500);
});
});



module.exports = router;
