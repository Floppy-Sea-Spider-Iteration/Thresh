const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')

router.post('/',
    chatController.createMessage,
    (req, res) => {
        res.sendStatus(200)
    }    
);

router.get('/',
    chatController.getMessages,
    (req, res) => {
        res.status(200).json(res.locals.allMessages)
    }
);

module.exports = router;