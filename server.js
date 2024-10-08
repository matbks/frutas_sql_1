import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const port = 3000;

// Enable CORS to allow front-end requests
app.use(cors());

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'srv1197.hstgr.io',
    user: 'u605516882_admin',
    password: '@Redware@2024',
    database: 'u605516882_redpass'
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.log('Database connection failed:', error.sqlMessage);
    } else {
        console.log('Database connected successfully');
    }
});

// Define a route to get fruit data based on the ID
app.get('/frutas/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM frutas WHERE id = ?`; // Use parameterized query to avoid SQL injection
    connection.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).send({ error: error.sqlMessage });
        }
        if (results.length === 0) {
            return res.status(404).send({ error: "Fruta não encontrada" });
        }
        res.send(results[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});