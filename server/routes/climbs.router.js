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
        GROUP BY "climbs"."id", "grade"."difficulty", "color", "photo"
        ORDER BY "grade"."difficulty" ASC;
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
router.get('/styles', rejectUnauthenticated, (req, res) => {
    // We'll just take all the grades
    //  TO DO: limit grades by boulder or rope, once client can send specifics
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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

/**
 * PUT route template
 * 
 */
router.put('/', (req, res) => {
    // PUT route code here
});

/**
 * DELETE route template
 */
 router.delete('/:id', (req, res) => {
    //  DELETE route code here
 })


module.exports = router;
