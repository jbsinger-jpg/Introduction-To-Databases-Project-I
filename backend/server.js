// ======================================================
// initialization steps
// ======================================================
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
// ======================================================
// db connection
// ======================================================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3dfe1iem",
    database: "renter",
    port: 3306,
});

app.listen(8081, () => {
    console.log('listening...');
});

// ======================================================
// base route
// ======================================================
app.get('/', (request, response) => {
    return response.json("From backend...");
});
// ======================================================
// renter CRUD Operations
// ======================================================
app.get('/renter', (request, response) => {
    const sql = "SELECT * FROM renter";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

// ======================================================
// product CRUD operations
// ======================================================
app.get('/product', (request, response) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

// ======================================================
// seller CRUD operations
// ======================================================
app.get('/seller', (request, response) => {
    const sql = "SELECT * FROM seller";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});
