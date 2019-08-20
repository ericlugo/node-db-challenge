const express = require('express');
const Tasks = require('../models/task-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tempTasks = await Tasks.find();
    const tasks = Array.from(tempTasks).map((task) => {
      if (task.completed === 1) return { ...task, completed: true };
      else return { ...task, completed: false };
    });
    res.status(200).json({
      success: true,
      message: `Tasks retrieved.`,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Tasks.find(req.params.id);
    task.completed === 1 ? (task.completed = true) : (task.completed = false);
    res.status(200).json({
      success: true,
      message: `Task retrieved.`,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const taskData = req.body;
    if (taskData.description && taskData.project_id) {
      const task = await Tasks.add(taskData);
      task.completed === 1 ? (task.completed = true) : (task.completed = false);
      res.status(201).json({
        success: true,
        message: `Task Added to Project ${taskData.project_id}.`,
        task,
      });
    }
    res.status(400).json({
      success: false,
      message: `Unable to Post.\n
        New Task requires "description" and "project_id".`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

module.exports = router;
