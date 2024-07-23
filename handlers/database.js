require('dotenv').config();
const mysql = require('mysql');

function query(sql, values, callback) {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to database: ' + err.stack);
            return;
        }
    });

    connection.query(sql, values, function(error, results, fields) {
        if (error) {
            console.error('Error executing query: ' + error.sqlMessage);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });

    connection.end();
}

module.exports = {
    query: query
};
