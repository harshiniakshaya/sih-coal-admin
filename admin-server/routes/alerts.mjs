const express = require('express')
const router = express.Router()

const pool = require('../index.js');

router.get('/', async(req,res)=>{
    console.log("hello")
    console.log(pool);
    try{
        const result = await pool.query('SELECT * FROM alerts');
        res.json(result.rows);
    }
    catch(error){
        console.error('Error fetching alerts:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
})

module.exports = router;