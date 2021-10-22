const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
//   console.log('getting all climbs for Gym: ', req.params.gymId, 'of style: ', req.params.styleId);
//   console.log("req.user: ", req.user);
//   console.log('Params: ', req.params);
  const query = `
                SELECT "logbook"."id", "climb_id", "send_date", "attempts", "grade_id_perceived",  
                "grade"."difficulty", "climbs"."color", "climbs"."movement_style", "climbs"."thumb_url" 
                FROM "logbook"
                JOIN "climbs" ON "logbook"."climb_id" = "climbs"."id"
                JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
                WHERE "logbook"."user_id" = $1
                GROUP BY "logbook"."id", "climb_id", "send_date", "attempts", "grade_id_perceived", "grade"."difficulty", "climbs"."color", "climbs"."movement_style", "climbs"."thumb_url";
                `;

  pool.query((query), [req.user.id])
  .then( (result) => {
    console.log('Sending back: ', result.rows); // Show me what I got
    res.send(result.rows)
  }).catch(error => {
      console.log('Error getting climbs: ', error);
      res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const climb = req.body.climb_id;
  const attempts = req.body.attempts;
  const grade = req.body.grade_id;
  console.log('Posting climb', climb, 'to logbook');
  const query = `INSERT INTO "logbook" 
                ("user_id", "climb_id", "attempts", "grade_id_perceived") 
                VALUES ($1, $2, $3, $4)
                RETURNING "id";`;
  pool.query(query, [req.user.id, climb, attempts, grade])
  .then(results => {
      // send back the ID of the new logbook entry
      console.log('results', results.rows);
      res.send(results.rows[0]);
  }).catch(error => {
      // or notify of the error
      console.log('ERROR posting to logbook', error);
      res.sendStatus(500);
  });
});

/**
 * DELETE route template
 */
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
    //  DELETE route code here
    console.log('DELETE from logbook : ', req.params, req.user.id);
    const idToDelete = req.params.id;
    const deleteQuery = `DELETE FROM "logbook" WHERE "id" = $1 and "user_id" = $2;`;
    pool.query((deleteQuery), [req.params.id, req.user.id])
    .then( (result) => {
    console.log('DELETEd Climb:',idToDelete, result.rowCount);
        if (result.rowCount > 0) {
            // we deleted something
            res.send({rCount: result.rowCount, message: 'You deleted the log entry!'})
        } else {
            // we did not delete anything
            res.send({rCount: result.rowCount, message: 'Nothing was deleted.'})
        }           
    }).catch(error => {
        console.log('ERROR in DELETE Climb ', error);
        res.sendStatus(500);
    });
});



/**
 * PUT route template
 */
 router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('Params: ', req.params.id);
    console.log('Body: ', req.body);
    const climbToEdit = req.params.id;
    const query = `
            UPDATE "logbook" SET 
                ("climb_id", "attempts", "grade_id_perceived") 
                = ($1, $2, $3)
                WHERE "id" = $4;
        `;
    pool.query((query), [
        req.body.climb_id, // $1
        req.body.attempts, // $2
        req.body.gradeId, // $3
        climbToEdit // $4
    ]).then( results => {
        console.log('PUT result: ', results.rowCount);
        res.sendStatus(200)
        res.send({rowsEdited: results.rowCount});
    }).catch(error => {
        console.log('ERROR in edit climb', error);
        res.sendStatus(500);
    });
});


module.exports = router;
