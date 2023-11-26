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

app.get('/renter/matching', (request, response) => {
    const { first_name, last_name, address } = request.query;

    const sql = `SELECT * FROM renter WHERE first_name = ? AND last_name = ? AND address = ?;`;
    db.query(sql, [first_name, last_name, address], (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: "A renter with these values already exists!", data: data });
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

        return response.json({ message: 'Renter created successfully', renter: { first_name, last_name, address } });
    });

    console.log(JSON.stringify(newItem));
});

app.patch('/renter/:id', (request, response) => {
    const id = request.params.id;
    const { first_name, last_name, address } = request.body;
    const values = [first_name, last_name, address];
    const updateSql = `
      UPDATE renter
      SET first_name = ?, last_name = ?, address = ?
      WHERE id = ${id};`;

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Renter updated successfully', renter: { first_name, last_name, address } });
    });
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

app.patch('/product/:id', (request, response) => {
    const id = request.params.id;
    const { price, seller_id, description } = request.body;
    const values = [price, seller_id, description];
    const updateSql = `
      UPDATE product
      SET price = ?, seller_id = ?, description = ?
      WHERE id = ${id};`;

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Product updated successfully', product: { price, seller_id, description } });
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

app.patch('/seller/:id', (request, response) => {
    const id = request.params.id;
    const { first_name, last_name, address } = request.body;
    const values = [first_name, last_name, address];
    const updateSql = `
      UPDATE seller
      SET first_name = ?, last_name = ?, address = ?
      WHERE id = ${id};`;

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Seller updated successfully', seller: { first_name, last_name, address } });
    });
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
app.get('/transaction', (request, response) => {
    const sql = "SELECT * FROM transaction";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json(err);
        }

        return response.json(data);
    });
});

app.patch('/transaction/:id', (request, response) => {
    const id = request.params.id;
    const { alias, start_time, end_time, product_id, seller_id, renter_id } = request.body;
    const values = [alias, start_time, end_time, product_id, seller_id, renter_id];
    const updateSql = `
      UPDATE product
      SET alias = ?, start_time = ?, end_time = ?, product_id = ?, seller_id = ?, renter_id = ?,
      WHERE id = ${id};`;

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return response.json(err);
        }

        return response.json({ message: 'Transaction updated successfully', transaction: { ...request.body } });
    });
});

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
    const { start_time, end_time, seller_id, renter_id, product_id, alias } = request.body;
    const values = [start_time, end_time, seller_id, renter_id, product_id, alias];
    const sql = `INSERT INTO transaction (start_time, end_time, seller_id, renter_id, product_id, alias) VALUES (?, ?, ?, ?, ?, ?)`;

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
