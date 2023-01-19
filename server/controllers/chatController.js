const db = require("../models/db");

const chatController = {};

chatController.createMessage = async (req, res, next) => {
  const { chatText } = req.body;
  const { boardID, ID } = req.cookies;
  try {
    const nameVal = [ID];
    const nameQuery = 'SELECT firstName, lastName FROM users WHERE _id = $1'
    const names = await db.query(nameQuery, nameVal);
    try {
        const fullName = names.rows[0].firstname + " " + names.rows[0].lastname;
        const values = [chatText, boardID, fullName];

        const query = 'INSERT INTO chats (chatText, boardID, fullName) values ($1, $2, $3)'
        await db.query(query, values); 
        return next()
   } 
    catch (err) {
        return next({
            log: "chatController.createMessage: error inserting into chat table",
            message: { err: "chatController.createMessage: " + err },
        });
   }
  }
  catch (err) {
    return next({
        log: "chatController.createMessage: error querying first and last name from users table",
        message: { err: "chatController.createMessage: " + err },
      });
   }
};

chatController.getMessages = async (req, res, next) => {
    try {
        const { boardID } = req.cookies;
        const values = [boardID]
        const query = 'SELECT * from chats WHERE boardID = $1'
        
        const result = await db.query(query, values);
        res.locals.allMessages = result.rows;
        return next()
    }
    catch (err) {
        return next({
            log: "chatController.getMessages: error querying messages from chats table",
            message: { err: "chatController.getMessages: " + err },
          });
       }
};

module.exports = chatController;