var express = require('express')
  , api = express();
/*
 * GET users listing.
 */
var getOne = function(req, res, next) {
  return next();
};
var getAll = function(req, res, next) {
  return next();
};
var saveOne = function(req, res, next) {
  return next();
};
var createOne = function(req, res, next) {
  return next();
};
api.get("/:id", getOne);
api.get("/", getAll);
api.put("/:id", saveOne);
api.post("/", createOne);
module.exports = api;
