const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController')

router.get('/create', 
    boardController.createBoard, 
    boardController.setUserBoard,
    (req,res) => {
        res.sendStatus(200);
    }
);
router.get('/view', 
    boardController.viewBoard, 
    boardController.setUserBoard,
    (req,res) => {
        res.sendStatus(200);
    }
);

module.exports = router;