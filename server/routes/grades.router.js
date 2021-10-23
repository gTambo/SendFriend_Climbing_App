const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET ALL the grades
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
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
 * GET 5 grades
 */
 router.get('/:id', rejectUnauthenticated, async (req, res) => {
    // We'll just take 5 of the grades
    try {
        console.log('Getting grades from id:', req.params.id);
        const limitQuery = `SELECT * FROM "grade" LIMIT 5 OFFSET $1;`;
        await pool.query(limitQuery, [req.params.id]).then( (result) => {
            console.log('Sending grades from DB: ', result.rows); // let's see 'em
            res.send(result.rows);
        });
    } catch (err) { // uh-oh
        console.log('There was an error getting grades: ', err);
        res.sendStatus(500);
    }
});

 module.exports = router;
