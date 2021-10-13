const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('req.user: ', req.user);
  const query = `SELECT * FROM "climb_style";`;
  pool.query(query).then( (result) => {
      console.log("send back: ", result.rows);
      res.send(result.rows);
  }).catch( error => {
      console.log('Error getting gyms', error);
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



