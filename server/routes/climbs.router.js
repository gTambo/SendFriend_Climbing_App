const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:gymId/:styleId', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log("req.user: ", req.user);
  console.log('Params: ', req.params);
  const query = `
        SELECT "climbs"."id", "grade"."difficulty", "color", "photo", "movement_style" FROM "climbs" 
        JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
        WHERE "gym_id" = $1 AND "climb_style_id" = $2
        GROUP BY "climbs"."id", "grade"."difficulty", "color", "photo"
        ORDER BY "grade"."difficulty" ASC;
    `;

  pool.query((query), [req.params.gymId, req.params.styleId])
  .then( (result) => {
    console.log('Sending back: ', result.rows);
    res.send(result.rows)
  }).catch(error => {
      console.log('Error getting climbs: ', error);
      res.sendStatus(500);
  });
});

router.get('/details/:climbId', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log("req.user: ", req.user);
    console.log('Params: ', req.params);
    const query = `
          SELECT "climbs"."id", "grade"."difficulty", "color", "photo", "movement_style" FROM "climbs" 
          JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
          WHERE "id" = $1
          GROUP BY "climbs"."id", "grade"."difficulty", "color", "photo"
          ORDER BY "grade"."difficulty" ASC;
      `;
  
    pool.query((query), [req.params.gymId, req.params.styleId])
    .then( (result) => {
      console.log('Sending back: ', result.rows);
      res.send(result.rows)
    }).catch(error => {
        console.log('Error getting climbs: ', error);
        res.sendStatus(500);
    });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
