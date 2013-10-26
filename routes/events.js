/**
 * Publishing Event routes
 * @type {exports|*}
 */
var express = require('express')
  , api = express();
/**
 *
 */
var init = function(req, res, next) {
  console.log('events');
  return next();
};

var getOne = function(req, res, next) {
  //get an event
  res.json({});
};

var getAll = function(req, res, next) {
  //get events
  console.log('events-getAll');
  res.json([{},{}]);
};

var saveOne = function(req, res, next) {
  //update an event
  return next();
};


var createOne = function(req, res, next) {
  //create a new event
  return next();
};

api.all("/", init);
api.get("/", getAll);
api.get("/:id", getOne);
api.put("/:id", saveOne);
api.post("/", createOne);
module.exports = api;
