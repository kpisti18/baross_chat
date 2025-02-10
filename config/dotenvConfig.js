const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    HOSTNAME: process.env.HOSTNAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
}

module.exports = { config };