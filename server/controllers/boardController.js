const db = require("../models/db");

const boardController = {};

boardController.createBoard = async (req, res, next) => {
  const { boardID } = req.body;
  const checkBoardID = "SELECT boardID FROM boards WHERE boardID = $1;";
  const createBoardID = "INSERT INTO boards (boardID) VALUES ($1);";
  const values = [boardID];
  try {
    const data = await db.query(checkBoardID, values);
    if (data.rows[0] !== undefined) {
      return next({
        log: "boardController.createBoard: boardID already exists",
        message: { err: "boardController.createBoard: boardID already exists" },
      });
    }
    try {
      await db.query(createBoardID, values);
      res.locals.boardID = boardID;
      return next();
    } catch (err) {
      return next({
        log: "boardController.createBoard: error creating new board",
        message: { err: "boardController.createBoard: " + err },
      });
    }
  } catch (err) {
    return next({
      log: "boardController.createBoard: error querying boards",
      message: { err: "boardController.createBoard: " + err },
    });
  }
};

boardController.viewBoard = async (req, res, next) => {
  const { boardID } = req.body;
  const checkBoardID = "SELECT boardID FROM boards WHERE boardID = $1;";
  const values = [boardID];
  try {
    const data = await db.query(checkBoardID, values);
    if (data.rows[0] !== undefined) {
      res.locals.boardID = boardID;
      return next();
    } else {
      return next({
        log: "boardController.viewBoard: boardID doesn't exist",
        message: { err: "boardController.viewBoard: " + err },
      });
    }
  } catch (err) {
    return next({
      log: "boardController.viewBoard: error querying data",
      message: { err: "boardController.viewBoard: " + err },
    });
  }
};

boardController.setUserBoard = async (req, res, next) => {
  const updateUserBoard = "UPDATE users SET boardid = $1 WHERE _id = $2";
  const values = [res.locals.boardID, req.cookies.ID];
  try {
    await db.query(updateUserBoard, values);
    res.cookie("boardID", res.locals.boardID, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: "boardController.setUserBoard: Failed to update users boardID",
      message: { err: "boardController.setUserBoard: " + err },
    });
  }
};

module.exports = boardController;
