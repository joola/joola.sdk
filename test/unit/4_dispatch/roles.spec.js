/**
 *  @title joolaio.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

describe("roles", function () {
  before(function (done) {
    this.uid = joolaio.common.uuid();
    this.workspace = 'test-org-' + joolaio.common.uuid();
    done();
  });

  it("should add a role", function (done) {
    var role = {
      key: 'test-role-' + this.uid,
      permissions: []
    };
    joolaio.roles.add(role, function (err, _role) {
      if (err)
        return done(err);

      expect(_role).to.be.ok;
      done();
    });
  });

  it("should return a valid list of roles", function (done) {
    joolaio.roles.list(function (err, roles) {
      return done(err);
    });
  });

  it("should fail adding an existing role", function (done) {
    var role = {
      key: 'test-role-' + this.uid,
      permissions: []
    };
    joolaio.roles.add(role, function (err, _role) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should fail to add a role with incomplete details", function (done) {
    var role = {
      key: 'test-role-missing-details'
    };
    joolaio.roles.add(role, function (err, _role) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  xit("should update a role", function (done) {
    var role = {
      key: 'test-role-' + this.uid,
      permissions: ['access_system']
    };
    joolaio.roles.patch(role.key,role, function (err, _role) {
      if (err)
        return done(err);
      expect(_role.permissions.length).to.equal(1);
      done();
    });
  });

  it("should fail updating unknown role", function (done) {
    var role = {
      key: 'test-role1-' + this.uid,
      permissions: ['access_system']
    };
    joolaio.roles.patch(role.key,role, function (err, _role) {
      if (err)
        return done();

      done(new Error('This should have failed'));
    });
  });

  it("should delete a role", function (done) {
    var self = this;
    var role = {
      key: 'test-role-' + this.uid
    };
    joolaio.roles.delete(role.key, function (err) {
      if (err)
        return done(err);

      joolaio.roles.get(role.key, function (err, role) {
        if (err)
          return done();

        return done('Failed to delete role');
      });
    });
  });

  it("should fail deleting a non existing role", function (done) {
    var role = {
      key: 'test-role-notexist'
    };
    joolaio.roles.delete(role, function (err) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });
});