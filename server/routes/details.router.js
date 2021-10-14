const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
 router.get('/:climbId', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log("req.user: ", req.user);
    console.log('Params: ', req.params);
    const query = `
            SELECT "climbs"."id", "grade"."difficulty", "color", "photo", "gym"."name", "movement_style", "date_added", "user"."username" FROM "climbs" 
            JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
            JOIN "gym" ON "climbs"."gym_id" = "gym"."id"
            JOIN "user" ON "climbs"."user_id" = "user"."id"
            WHERE "climbs"."id" = $1
            GROUP BY "climbs"."id", "grade"."difficulty", "color", "photo", "gym"."name", "user"."username";
      `;
  
    pool.query((query), [req.params.climbId])
    .then( (result) => {
      console.log('Sending back: ', result.rows);
      res.send(result.rows)
    }).catch(error => {
        console.log('Error getting climbs: ', error);
        res.sendStatus(500);
    });
  });

  /**
   * GET route for Comments
   */


  /**
   * GET route for Ratings
   * 
   */
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
