const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/add", 
    commentController.addComment,
    (req, res) => {
        res.sendStatus(200)
    }
);

router.post("/get", 
    commentController.getComments,
    (req, res) => {
        res.status(200).json(res.locals.comments)
    }
);

//deleting comment
router.post('/delete',
    commentController.deleteComment,
    (req, res) => {
        res.sendStatus(200)
    }
);

module.exports = router;
