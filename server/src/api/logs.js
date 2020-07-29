const { Router } = require('express');

const Log = require('../models/Log');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let log = new Log(req.body);
    log = await log.save();
    res.json(log);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});

module.exports = router;
