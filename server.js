const express = require('express');

const mysql = require('mysql2');

const cors = require('cors');

const app = express();        // Create an instance of the express application

app.use(cors());              // Enable CORS pol

// icy for all routes

const connection = mysql.createConnection({

    host: 'localhost',

    user: 'root',       // Replace with your MySQL username

    password: 'mysql',   // Replace with your MySQL password

    database: 'mysports'    // Replace with your database name

});

// Establish a connection to the database

connection.connect((err) => {

    if (err) throw err;

    console.log('Connected to the MySQL server.'); // Confirmation message

});

// Define a route to retrieve data from the database

app.get('/sports', (req, res) => {
    console.log('getsports.');
    connection.query('SELECT * FROM sports', (err, results) => {

        if (err) throw err;
        console.log('gotsports', results);
        res.json(results);        // Send query results back to the client

    });

});

app.get('/courses/:sportId', (req, res) => {

    console.log('getcourses by id', req.params.sportId);
    const query = 'SELECT * FROM courses where SPORT_ID = ' + req.params.sportId;
    connection.query(query, (err, results) => {
        res.json(results);
        console.log('gotCourses', results);
        if (err) throw err;

    });

});


// Start the server on port 3000

const port = 3000;

app.listen(port, () => {

    console.log(`Server running on port ${port}`);

});
