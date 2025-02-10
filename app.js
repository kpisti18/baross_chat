const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);

module.exports = app;