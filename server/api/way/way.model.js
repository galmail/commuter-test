'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WaySchema = new mongoose.Schema({
  name: String,
  votes: Number,
  active: Boolean
});

export default mongoose.model('Way', WaySchema);
