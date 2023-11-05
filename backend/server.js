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

app.get('/product_owners', (request, response) => {
    const sql = "SELECT first_name, last_name FROM seller " +
        "INNER JOIN product ON product.owner = seller.id";

    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

app.get('/product_owners/:id', (request, response) => {
    const id = request.params.id;
    const sql = "SELECT first_name, last_name FROM seller " +
        "INNER JOIN product ON product.owner = seller.id " +
        "WHERE product.id = ?";

    db.query(sql, [id], (err, data) => {
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
