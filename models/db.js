const mysql = require('mysql2/promise');
const { config } = require('../config/dotenvConfig');

const db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    timezone: 'Z',
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0
});

module.exports = db;