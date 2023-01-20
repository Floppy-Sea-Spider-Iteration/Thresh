const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

//GET ALL TASKS
router.get('/', tasksController.getTasks, (req, res, next) => {
  res.status(200).json(res.locals.allTasks);
});

//CREATE ONE TASK ROUTE
router.post('/create', tasksController.createTask, (req, res, next) => {
  res.status(200).json(res.locals.newTask)
});

//DELETE ONE TASK ROUTE
router.delete('/delete', tasksController.deleteTask, (req, res, next) => {
  res.status(200).json(res.locals.deletedTask)
});

//UPDATE TASK ROUTE
router.post('/updateColumn', tasksController.updateColumn, (req, res) => {
  res.sendStatus(200)
})

//GET ONE TASK ROUTE
router.get('/:id', tasksController.getTask, (req, res, next) => {
  res.status(200).json(res.locals.oneTask);
});
//UPDATE ONE TASK ROUTE
router.patch('/:id', tasksController.updateTask, (req, res, next) => {
  res.status(200).json(res.locals.updatedTask)
});

module.exports = router;

