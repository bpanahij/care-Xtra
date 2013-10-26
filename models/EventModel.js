/**
 * Model for tracking events needing to be done for patient by Care Givers
 * @type {exports|*}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new mongoose.Schema({
  button: String,
  instructions: Schema.Types.Mixed,
  isCompleted: Boolean
});
module.exports = mongoose.model("Event", EventSchema);
