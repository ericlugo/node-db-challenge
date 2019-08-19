const express = require('express');
const Resources = require('../models/resource-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Resources.find();
    res.status(200).json({
      success: true,
      message: `Resources retrieved.`,
      resources,
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
    const resource = await Resources.find(req.params.id);
    res.status(200).json({
      success: true,
      message: `Resources retrieved.`,
      resource,
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
    const resourceData = req.body;
    if (resourceData.name) {
      const resource = await Resources.add(resourceData);
      res.status(201).json({
        success: true,
        message: `Resource added.`,
        resource,
      });
    }
    res.status(400).json({
      success: false,
      message: `Unable to Post.\n
        New resource requires "name".`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
});

module.exports = router;
