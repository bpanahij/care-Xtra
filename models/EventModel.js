/**
 * Model for tracking events needing to be done for patient by Care Givers
 * @type {exports|*}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new mongoose.Schema({
  title: String,
  creatorId: String,
  doerId: String,
  frequency: Integer,
  locationName: String,
  geocode: {
    lat: Number,
    long: Number
  },
  eventType: String,
  instruction: Schema.Types.Mixed,
  instructionTemplate: String,
  isCompleted: Boolean
});
module.exports = mongoose.model("Event", EventSchema);
