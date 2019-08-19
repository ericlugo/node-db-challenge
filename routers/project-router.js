const express = require('express');
const Projects = require('../models/project-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tempProjects = await Projects.find();
    const projects = Array.from(tempProjects).map((project) => {
      if (project.completed === 1) return { ...project, completed: true };
      else return { ...project, completed: false };
    });
    res.status(200).json({
      success: true,
      message: `Projects retrieved.`,
      projects,
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
    const project = await Projects.find(req.params.id);
    project.completed === 1
      ? (project.completed = true)
      : (project.completed = false);
    res.status(200).json({
      success: true,
      message: `Projects retrieved.`,
      project,
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
    const projectData = req.body;
    if (projectData.name) {
      const project = await Projects.add(projectData);
      project.completed === 1
        ? (project.completed = true)
        : (project.completed = false);
      res.status(201).json({
        success: true,
        message: `Project added.`,
        project,
      });
    }
    res.status(400).json({
      success: false,
      message: `Unable to Post.\n
        New Project requires "name".`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

module.exports = router;
