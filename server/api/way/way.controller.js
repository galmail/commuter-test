/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ways              ->  index
 * POST    /api/ways              ->  create
 * GET     /api/ways/:id          ->  show
 * PUT     /api/ways/:id          ->  update
 * DELETE  /api/ways/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var way = require('./way.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of ways
export function index(req, res) {
  way.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single way from the DB
export function show(req, res) {
  way.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new way in the DB
export function create(req, res) {
  way.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing way in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  way.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a way from the DB
export function destroy(req, res) {
  way.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}



// Upvote a commute way
export function upvote(req, res) {
  way.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function(wayObj){
      wayObj.votes++;
      return wayObj;
    })
    .then(saveUpdates())
    .then(responseWithResult(res))
    .catch(handleError(res));
}


