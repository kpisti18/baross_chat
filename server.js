const app = require('./app');
const { HOST, PORT} = require('./config/dotenvConfig').config;
const adminScheduler = require('./services/adminScheduler');

app.listen(PORT, HOST, () => {
    console.log('Fut');
});