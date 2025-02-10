const express = require('express');
const { getAllMessages, sendMessage, deleteMessage, modifyMessage } = require('../controllers/messageControllers');

const router = express.Router();

router.get('/getAllMessages', getAllMessages);
router.post('/sendMessage/:user_id', sendMessage);
router.delete('/deleteMessage/:user_id/:message_id', deleteMessage);
router.put('/modifyMessage/:user_id/:message_id', modifyMessage)

module.exports = router;