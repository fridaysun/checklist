var express = require('express');
var router = express.Router();

/* GET checklist app. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Checklist' });
});

module.exports = router;
