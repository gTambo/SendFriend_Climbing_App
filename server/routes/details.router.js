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
    SELECT "climbs"."id", "grade"."difficulty", "color", "photo", "gym"."name", "movement_style", "date_added", "user"."username", 
    COALESCE((AVG("rating"."rating")::NUMERIC(10)),0) 
    FROM "climbs" 
    JOIN "grade" ON "climbs"."grade_id" = "grade"."id"
    JOIN "gym" ON "climbs"."gym_id" = "gym"."id"
    JOIN "user" ON "climbs"."user_id" = "user"."id"
    LEFT JOIN "rating" ON "climbs"."id" = "rating"."climb_id"
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
 * POST route for Comments
 */

/**
 * POST route for rating
 */
router.post('/rating', rejectUnauthenticated, (req, res) => {
    console.log('rating router: ', req.body);
    console.log('rating router, user: ', req.user);
    // rating to add is rating property
    const addRating = req.body.rating;
    const climb_id = req.body.climb_id;
    const queryText = `INSERT INTO "rating" 
                            ("rating", "climb_id", "user_id") 
                        VALUES 
                            ($1, $2, $3);`;
    pool.query((queryText), [addRating, climb_id, req.user.id])
    .then((result) => {
        console.log('After rating post: ', result);

    })
});

  /**
 * PUT route template
 */
router.put('/', (req, res) => {
  // POST route code here
});

module.exports = router;
