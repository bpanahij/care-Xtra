var express = require('express')
  , api = express();
/**
 * loading the main page
 */
var init = function(req, res, next) {
  console.log('init');
  return next();
};
var index = function(req, res, next) {
  res.render('index', {});
};
api.all("/", init);
api.get("/", index);
module.exports = api;
