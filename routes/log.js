var express = require('express');
var router = express.Router();

/* GET checklist app. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'History' });
});

module.exports = router;
