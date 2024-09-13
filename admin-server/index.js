const express = require("express")
const cors = require("cors")
const { Pool } = require("pg");


const app = express()


app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))


 const pool = new Pool({
    connectionString: "postgresql://prasanthsampath2005:vkz5LjT6NMqf@ep-shiny-snow-a5apfu5t.us-east-2.aws.neon.tech/coal?sslmode=require"
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connected to PostgreSQL database at:', result.rows[0].now);
    });
});


// app.use('/alerts', alertsRoute);
app.get('/alerts', async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM alerts');
        res.json(result.rows);
    }
    catch(error){
        console.error('Error fetching alerts:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
})

app.get('/events', async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    }
    catch(error){
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
})

app.get('/injuries', async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM injuries');
        res.json(result.rows);
    }
    catch(error){
        console.error('Error fetching injuries:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
})

app.get('/issues', async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM issues');
        res.json(result.rows);
    }
    catch(error){
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
})

app.get('/tasks', async (req, res) => {
    console.log('called');
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    console.log('Creating task');
    const { task, isdone, allottedtime, completedtime, description } = req.body;

    if (!task || allottedtime === undefined || description === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO tasks (task, isdone, allottedtime, completedtime, description)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [task, isdone, allottedtime, completedtime, description];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});


// module.exports = pool;
app.listen(3001,()=>{
    console.log("server is running!");
})


