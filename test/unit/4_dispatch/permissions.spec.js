/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var async = require('async');

describe("permissions", function () {
  before(function (done) {
    this.uid = joola.common.uuid();
    this.workspace = 'test-org-' + joola.common.uuid();
    done();
  });

  it("should add a permission", function (done) {
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.permissions.add(permission, function (err, _permission) {
      if (err)
        return done(err);

      expect(_permission).to.be.ok;
      done();
    });
  });

  it("should return a valid list of permissions", function (done) {
    joola.permissions.list(function (err, permissions) {
      return done(err);
    });
  });

  it("should fail adding an existing permission", function (done) {
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.permissions.add(permission, function (err, _permission) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });


  it("should update a permission", function (done) {
    var permission = {
      name: 'test-permission-' + this.uid,
      test: 1
    };
    joola.permissions.update(permission, function (err, _permission) {
      if (err)
        return done(err);
      expect(_permission.test).to.equal(1);
      done();
    });
  });

  it("should fail updating unknown permission", function (done) {
    var permission = {
      name: 'test-permission1-' + this.uid,
      test: 1
    };
    joola.permissions.update(permission, function (err) {
      if (err)
        return done();

      done(new Error('This should have failed'));
    });
  });

  it("should fail updating permission with incomplete details", function (done) {
    var permission = {

    };
    joola.permissions.update(permission, function (err) {
      if (err)
        return done();

      done(new Error('This should have failed'));
    });
  });

  it("should delete a permission", function (done) {
    var self = this;
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.permissions.delete(permission, function (err) {
      if (err)
        return done(err);

      joola.permissions.list(function (err, permissions) {
        if (err)
          return done(err);

        var exist = _.filter(permissions, function (item) {
          return item.name == 'test-permission';
        });
        try {
          expect(exist.length).to.equal(0);
          done();
        }
        catch (ex) {
          done(ex);
        }
      });
    });
  });

  it("should fail deleting a non existing permission", function (done) {
    var permission = {
      name: 'test-permission-notexist'
    };
    joola.permissions.delete(permission, function (err) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });
});