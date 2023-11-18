// ========================================================================================================================================================================================================================
// initialization steps
// ========================================================================================================================================================================================================================
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
// ========================================================================================================================================================================================================================
// db connection
// ========================================================================================================================================================================================================================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3dfe1iem",
    database: "renter",
    port: 3306,
});

app.use(express.json());
app.use(express.urlencoded());

app.listen(8081, () => {
    console.log('listening...');
});

// ========================================================================================================================================================================================================================
// base route
// ========================================================================================================================================================================================================================
app.get('/', (request, response) => {
    return response.json("From backend...");
});
// ========================================================================================================================================================================================================================
// renter CRUD Operations
// ========================================================================================================================================================================================================================
app.get('/renter', (request, response) => {
    const sql = "SELECT * FROM renter";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

app.delete('/renter/:id', (request, response) => {
    const id = request.params.id;
    const deleteSql = `
      DELETE FROM renter
      WHERE id = ?;`;

    // Execute the delete query
    db.query(deleteSql, [id], (deleteError) => {
        if (deleteError) {
            console.error('Error executing delete query:', deleteError);
            response.status(500).send('Internal Server Error');
            return;
        }

        // Send the deleted renter information back as JSON
        response.json({ message: 'Renter deleted successfully' });
    });
});

app.post('/renter', (request, response) => {
    const newItem = request.body;
    const { first_name, last_name, address } = request.body;
    const values = [first_name, last_name, address];
    const sql = `INSERT INTO renter (first_name, last_name, address) VALUES (?, ?, ?)`;

    db.query(sql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Product created successfully', renter: { first_name, last_name, address } });
    });

    console.log(JSON.stringify(newItem));
});

// ========================================================================================================================================================================================================================
// product CRUD operations
// ========================================================================================================================================================================================================================
app.get('/product', (request, response) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

// ========================================================================================================================================================================================================================
// seller CRUD operations
// ========================================================================================================================================================================================================================
app.get('/seller', (request, response) => {
    const sql = "SELECT * FROM seller";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

app.post('/seller', (request, response) => {
    const newItem = request.body;
    const { first_name, last_name, address } = request.body;
    const values = [first_name, last_name, address];
    const sql = `INSERT INTO seller (first_name, last_name, address) VALUES (?, ?, ?)`;
    const matchingUser = `SELECT * FROM seller 
        WHERE first_name = ? AND last_name = ? AND address = ?
        LIMIT 1;`;

    db.query(matchingUser, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        // Check if a seller was not found
        if (result.length === 0) {
            db.query(sql, values, (err, result) => {
                if (err) {
                    return response.json(err);
                }

                return response.json({ message: 'Seller created successfully', seller: { first_name, last_name, address } });
            });
        }
        else {
            response.status(500).send({ message: 'Seller already exists' });
        }
    });

    console.log(JSON.stringify(newItem));
});

app.delete('/seller/:id', (request, response) => {
    const id = request.params.id;
    const deleteSql = `
      DELETE FROM seller
      WHERE id = ?;`;

    // Execute the delete query
    db.query(deleteSql, [id], (deleteError) => {
        if (deleteError) {
            console.error('Error executing delete query:', deleteError);
            response.status(500).send('Internal Server Error');
            return;
        }

        // Send the deleted renter information back as JSON
        response.json({ message: 'Renter deleted successfully' });
    });
});
