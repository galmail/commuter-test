'use strict';

var app = require('../..');
import request from 'supertest';

var newWay;

describe('Way API:', function() {

  describe('GET /api/ways', function() {
    var ways;

    beforeEach(function(done) {
      request(app)
        .get('/api/ways')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ways = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ways.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ways', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ways')
        .send({
          name: 'New Way',
          info: 'This is the brand new way!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWay = res.body;
          done();
        });
    });

    it('should respond with the newly created way', function() {
      newWay.name.should.equal('New Way');
      newWay.info.should.equal('This is the brand new way!!!');
    });

  });

  describe('GET /api/ways/:id', function() {
    var way;

    beforeEach(function(done) {
      request(app)
        .get('/api/ways/' + newWay._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          way = res.body;
          done();
        });
    });

    afterEach(function() {
      way = {};
    });

    it('should respond with the requested way', function() {
      way.name.should.equal('New Way');
      way.info.should.equal('This is the brand new way!!!');
    });

  });

  describe('PUT /api/ways/:id', function() {
    var updatedWay;

    beforeEach(function(done) {
      request(app)
        .put('/api/ways/' + newWay._id)
        .send({
          name: 'Updated Way',
          info: 'This is the updated way!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWay = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWay = {};
    });

    it('should respond with the updated way', function() {
      updatedWay.name.should.equal('Updated Way');
      updatedWay.info.should.equal('This is the updated way!!!');
    });

  });

  describe('DELETE /api/ways/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ways/' + newWay._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when way does not exist', function(done) {
      request(app)
        .delete('/api/ways/' + newWay._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
