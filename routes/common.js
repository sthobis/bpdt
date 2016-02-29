var express = require('express');
var router = express.Router();
var commonController = require('../server/controllers/common-controller.js');

/* 
 * GET home page. 
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
 * GET export page. 
 */
router.get('/download', commonController.exportPdf);

module.exports = router;
