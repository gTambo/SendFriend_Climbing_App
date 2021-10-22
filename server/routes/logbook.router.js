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
                SELECT "logbook"."id", "send_date", "attempts", "grade_id_perceived",  
                "grade"."difficulty", "climbs"."color", "climbs"."movement_style", "climbs"."thumb_url" 
                FROM "logbook"
                JOIN "climbs" ON "logbook"."climb_id" = "climbs"."id"
                JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
                WHERE "logbook"."user_id" = $1
                GROUP BY "logbook"."id", "send_date", "attempts", "grade_id_perceived", "grade"."difficulty", "climbs"."color", "climbs"."movement_style", "climbs"."thumb_url";
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

module.exports = router;
