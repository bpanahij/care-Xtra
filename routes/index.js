var express = require('express')
  , api = express();
/**
 * loading the main page
 */
api.get("/", function(req, res) {
  res.render('index', { title: 'Express' });
});
module.exports = api;
