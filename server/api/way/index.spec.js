'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wayCtrlStub = {
  index: 'wayCtrl.index',
  show: 'wayCtrl.show',
  create: 'wayCtrl.create',
  update: 'wayCtrl.update',
  destroy: 'wayCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wayIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './way.controller': wayCtrlStub
});

describe('way API Router:', function() {

  it('should return an express router instance', function() {
    wayIndex.should.equal(routerStub);
  });

  describe('GET /api/ways', function() {

    it('should route to way.controller.index', function() {
      routerStub.get
        .withArgs('/', 'wayCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ways/:id', function() {

    it('should route to way.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'wayCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ways', function() {

    it('should route to way.controller.create', function() {
      routerStub.post
        .withArgs('/', 'wayCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ways/:id', function() {

    it('should route to way.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'wayCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ways/:id', function() {

    it('should route to way.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'wayCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ways/:id', function() {

    it('should route to way.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'wayCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
