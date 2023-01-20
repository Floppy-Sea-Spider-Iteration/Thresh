// const { io } = require('socket.io-client');
const db = require('../models/db');

const tasksController = {};


//GET ALL TASKS CONTROLLER
tasksController.getTasks = (req, res, next) => {
  const { boardID } = req.cookies;
  const text = 'SELECT * FROM tasks WHERE boardID = $1';
  const values = [boardID];
    db.query(text, values)
    .then(data => {
       // console.log('DATA: ', data);
        //console.log('DATA.ROWS: ', data.rows);
        res.locals.allTasks = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTasks',
        message: {err: 'Error in taskController.getTasks'}
      })
    })
};

//GET ONE TASK CONTROLLER
tasksController.getTask = (req, res, next) => {
  const id = req.params.id //set ID primary key in table
    const text = `SELECT * FROM task WHERE _id = ${id}`; 
    db.query(text)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneTask = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTask',
        message: {err: 'Error in taskController.getTask'}
      })
    })
};

//CREATE ONE TASK CONTROLLER
tasksController.createTask = (req,res,next) => {
  const { ID, boardID } = req.cookies;

  const {
    title,
    text,
    // create_date,
    // comment_id
  } = req.body
  
  console.log(req.body);
  console.log(ID, boardID);

  const query = `INSERT INTO tasks (title, text, userID, boardID)
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;

  const values = [
    title,
    text,
    ID,
    boardID
    // create_date
  ]

  db.query(query, values)
    .then(data => {
      console.log('data:', data.rows[0])
      res.locals.newTask = data.rows[0]
      // io.emit('newTodo', data.rows[0])
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.createTask',
        message: {err: 'Error in taskController.createTask'}
      })
    })
}
//DELETE ONE TASK CONTROLLER
tasksController.deleteTask = (req,res,next) => {
  const { id } = req.query //set ID primary key in table
  const text = `DELETE FROM tasks WHERE _id = ${id}`

  db.query(text) 
    .then(data => {
      res.locals.deletedTask = data.rows;
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.deleteTask',
        message: {err: 'Error in taskController.deleteTask'}
      })
    })
}

tasksController.updateColumn = async (req, res, next) => {
  try {
    const { taskID, currentColumn} = req.body;
    const query = 'UPDATE tasks SET currentColumn = $1 WHERE _id =$2';
    const values = [currentColumn, taskID];
    await db.query(query, values)
    return next()
  }
  catch (err) {
    return next({
      log: 'tasksController.updateColumn: unable to update tasks currentColumn',
      message: {err: 'tasksController.updateColumn ' + err}
    })
  }
};


//UPDATE ONE TASK CONTROLLER ---> not working yet
tasksController.updateTask = (req,res,next) => {
  const { id } = req.query; //set ID primary key in table
  const { newUpdate, newTaskDetail, newDateCreated, newDoing, newDone } = req.body;

  const text = `UPDATE task SET taskTitle = ${newUpdate}, taskDetail = ${newTaskDetail}, dateCreated = ${newDateCreated}, doing= ${newDoing}, done= ${newDone} WHERE _id = ${id}`;

  db.query(text)
    .then(data => {
      res.locals.updatedTask = data.rows;
      return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.updateTask',
        message: {err: 'Error in taskController.updateTask'}
      })
    })
}

module.exports = tasksController