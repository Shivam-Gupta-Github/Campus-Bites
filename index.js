import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());    //Express middleware to parse JSON requests
app.use(express.static("public"));

// Load environment variables from .env file
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/login.html");
});

// app.get("/login", (req, res) => {
//     res.sendFile(__dirname + "/html/login.html");
// });

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/html/register.html");
})


// Registration endpoint
app.post('/register', (req, res) => {
    const { id, name, email, password } = req.body;
    // Insert user into the database
    db.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, password], (err, result) => {
        if (err) {
            res.status(500).send('Error registering user');
        } else {
            res.status(201).redirect('/');
        }
    });
});

// Login endpoint
app.post('/', (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);
    // Find user by username and password
    db.query('SELECT * FROM users WHERE id = ? AND password = ?', [id, password], (err, results) => {
        if (err) {
            res.status(500).send('Error logging in');
        } else if (results.length === 0) {
            //res.status(401).send('Invalid username or password');
            res.status(401).render("invalid-authentication.ejs");
        } else {
            //res.status(200).sendFile(__dirname + "/html/index.html");
            res.status(200).render("index.ejs");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
