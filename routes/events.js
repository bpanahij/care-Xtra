/**
 * Publishing Event routes
 * @type {exports|*}
 */
var express = require('express')
  , api = express()
  , _ = require('underscore');

var EventModel = require('../models/EventModel');
/**
 *
 */
var init = function(req, res, next) {
  console.log('events');
  return next();
};

var getOne = function(req, res, next) {
  //get an event
  EventModel.findById(req.params.id, function(err, Event)
  {
    res.json(Event);
  });
};

var getAll = function(req, res, next) {
  //get events
  EventModel.find({}, function(err, Events)
  {
    res.json(Events);
  });
};

var saveOne = function(req, res, next) {
  //update an event
  EventModel.findById(req.body._id, function(err, Event)
  {
    if (_.isEmpty(Event))
    {
      Event = new EventModel(req.body);
      Event.save(function(err) {
        res.json(Event);
        return;
      });
    }
    Event.update(_.omit(req.body, '_id'), {}, function(err, rawDoc) {
      res.json(req.body);
    });
    return;
  });
};


var createOne = function(req, res, next) {
  //create a new event
  return next();
};

api.all("/", init);
api.get("/", getAll);
api.get("/:id", getOne);
api.put("/:id", saveOne);
api.post("/", saveOne);
module.exports = api;
