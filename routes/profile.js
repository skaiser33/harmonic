const express = require('express');
const router = express.Router();
const db = require('../models');



router.get('/:id', (req, res) => {
  res.render('profile');
});


module.exports = router;
