/**
 * Way model events
 */

'use strict';

import {EventEmitter} from 'events';
var Way = require('./way.model');
var WayEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WayEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Way.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WayEvents.emit(event + ':' + doc._id, doc);
    WayEvents.emit(event, doc);
  }
}

export default WayEvents;
