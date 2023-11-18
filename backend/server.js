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

app.post('/product', (request, response) => {
    const newItem = request.body;
    const { price, seller_id, description } = request.body;
    const values = [price, seller_id, description];
    const sql = `INSERT INTO product (price, seller_id, description) VALUES (?, ?, ?)`;

    db.query(sql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Product created successfully', product: newItem });
    });

    console.log(JSON.stringify(newItem));
});

app.delete('/product/:id', (request, response) => {
    const id = request.params.id;
    const deleteSql = `
      DELETE FROM product
      WHERE id = ?;`;

    // Execute the delete query
    db.query(deleteSql, [id], (deleteError) => {
        if (deleteError) {
            console.error('Error executing delete query:', deleteError);
            response.status(500).send('Internal Server Error');
            return;
        }

        // Send the deleted renter information back as JSON
        response.json({ message: 'Product deleted successfully' });
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

    db.query(sql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Product created successfully', renter: { first_name, last_name, address } });
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

// ========================================================================================================================================================================================================================
// transaction CRUD operations
// ========================================================================================================================================================================================================================
app.post('/transaction', (request, response) => {
    // ===============================
    // REQUEST BODY:
    // ===============================
    // startTime: startTime,
    // endTime: endTime,
    // seller: seller,
    // renter: renter,
    // product: product,
    // ===============================
    const newItem = request.body;
    const { start_time, end_time, seller, renter, product } = request.body;
    const values = [start_time, end_time, seller, renter, product];
    const sql = `INSERT INTO transaction (start_time, end_time, seller, renter, product) VALUES (?, ?, ?. ?, ?)`;

    db.query(sql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Transaction created successfully', transaction: newItem });
    });

    console.log(JSON.stringify(newItem));
});

app.delete('/transaction/:id', (request, response) => {
    const id = request.params.id;
    const deleteSql = `
      DELETE FROM transaction
      WHERE id = ?;`;

    // Execute the delete query
    db.query(deleteSql, [id], (deleteError) => {
        if (deleteError) {
            console.error('Error executing delete query:', deleteError);
            response.status(500).send('Internal Server Error');
            return;
        }

        // Send the deleted renter information back as JSON
        response.json({ message: 'Transaction deleted successfully' });
    });
});
