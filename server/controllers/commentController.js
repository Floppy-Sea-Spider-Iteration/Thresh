const db = require("../models/db");

const commentController = {};

commentController.addComment = async (req, res, next) => {
    const { taskID, commentBody } = req.body;
    const { ID, boardID } = req.cookies;
    console.log('taskID: ', taskID, 'commentBody: ', commentBody);
    console.log(ID);
    const query = 'INSERT INTO comments (text, userID, taskID, boardID) VALUES ($1, $2, $3, $4);';
    const values = [commentBody, ID, taskID, boardID];

    try {
        await db.query(query, values);
        return next();
    }
    catch (err) {
        return next({
            log: 'commentController.addComment: Error adding comment into comments', 
            message: {err: 'commentController.addComment: ' + err}
        });
    }
};

commentController.getComments = async (req, res, next) => {
    const { taskID } = req.body;

    const query = 'SELECT * FROM comments WHERE taskID = $1';
    const values = [taskID];

    try {
        const comments = await db.query(query, values);
        res.locals.comments = comments
        return next();
    }
    catch (err) {
        return next({
            log: 'commentController.getComments: Error querying comments', 
            message: {err: 'commentController.getComments: ' + err}
        });
    }
};

commentController.deleteComment = async (req, res, next) => {
    const { commentID } = req.body;
    const query = 'DELETE FROM comments WHERE _id = $1';
    const value = [commentID];

    try {
        await db.query(query, value)
        return next()
    }
    catch (err) {
        return next({
            log: 'commentController.deleteComment: Error deleting comment',
            message: {err: 'commentController.deleteComment: ' + err}
        })
    }
};


module.exports = commentController;