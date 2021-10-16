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
    const climbId = req.params.climbId;
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
  
    pool.query((query), [climbId])
    .then( (result) => {
        console.log('Sending back details: ', result.rows);
        res.send(result.rows);
        const commentQuery = `SELECT "comment"."comment", "created_at", "user"."username" 
                        FROM "comment"
                        JOIN "user" ON "comment"."user_id" = "user"."id"
                        WHERE "comment"."climb_id" = $1
                        GROUP BY "comment"."id", "user"."username"
                        ORDER BY "comment"."created_at";
        `;
        pool.query((commentQuery), [climbId])
        .then(response => {
            console.log("Comments for the climb: ", response.rows);
            if (response.rowCount > 0) {
                res.send(response.rows);
            } else {
                res.send({ id: climbId, comment: 'No comments yet' })
            }
        }).catch( error => {
            console.log('ERROR FETCHING COMMENTS', error);
            res.sendStatus(500);
        });
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
 router.post('/comment', rejectUnauthenticated, (req, res) => {
    console.log('comment router: ', req.body);
    console.log('comment router, user: ', req.user);
    // rating to add is rating property
    const addComment = req.body.comment;
    const climb_id = req.body.climb_id;
    const queryText = `INSERT INTO "comment" 
                            ("comment", "climb_id", "user_id") 
                        VALUES 
                            ($1, $2, $3);`;
    pool.query((queryText), [addComment, climb_id, req.user.id])
    .then((result) => {
        console.log('After comment post: ', result);
    }).catch(error => {
        console.log('ERROR posting comment', error);
        res.sendStatus(500);
    });
});

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
    }).catch(error => {
        console.log("ERROR posting rating", error);
        res.sendStatus(500);
    });
});

  /**
 * PUT route template
 */
router.put('/', (req, res) => {
  // POST route code here
});

module.exports = router;
