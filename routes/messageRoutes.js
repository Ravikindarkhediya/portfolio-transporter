const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');

router.post('/send-email', sendMessage);

module.exports = router;
