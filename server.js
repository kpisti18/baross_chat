const app = require('./app');
const { HOST, PORT} = require('./config/dotenvConfig').config;

app.listen(PORT, HOST, () => {
    console.log('Fut');
});