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

describe("users", function () {
  before(function (done) {
    this.uid = joola.common.uuid();
    this.workspace = 'root';
    return done();
  });

  it("should have a valid users dispatch", function (done) {
    expect(joola.dispatch.users).to.be.ok;
    return done();
  });

  it("should list all available users", function (done) {
    joola.users.list(function (err, users) {
      return done(err);
    });
  });

  it("should add a user", function (done) {
    var user = {
      username: 'tester-' + this.uid,
      displayName: 'tester user',
      _password: '1234',
      _roles: ['user'],
      _filter: '',
      workspace: this.workspace
    };
    joola.users.add(user, function (err, user) {
      return done(err);
    });
  });

  it("should fail adding a user with incomplete details", function (done) {
    var user = {
      username: 'tester2'
    };
    joola.users.add(user, function (err, user) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should get a user by username", function (done) {
    var username = 'tester-' + this.uid;
    var self = this;
    joola.users.get(username, function (err, user) {
      if (err)
        return done(err);
      expect(user).to.be.ok;
      expect(user.username).to.equal('tester-' + self.uid);
      return done();
    });
  });

  it("should fail adding a user with an already existing username", function (done) {
    var user = {
      username: 'tester-' + this.uid,
      displayName: 'tester user',
      _password: '1234',
      _roles: ['user'],
      _filter: '',
      workspace: this.workspace
    };
    joola.users.add(user, function (err, user) {
      if (err)
        return done();
      return done(new Error('This should fail.'));
    });
  });

  it("should update a user", function (done) {
    var self = this;
    var user = {
      username: 'tester-' + this.uid,
      displayName: 'testing user',
      _password: '1234',
      _roles: ['user'],
      _filter: '',
      workspace: this.workspace
    };
    user.displayName = 'testing user with change';
    joola.users.update(user, function (err) {
      if (err)
        return done(err);

      joola.users.get(user.username, function (err, _user) {
        if (err)
          return done(err);
        expect(_user).to.be.ok;
        if (_user.displayName === 'testing user with change')
          return done();
        return done(new Error('Failed to update user'));
      });
    });
  });

  it("should apply filter on user level", function (done) {
    var user = {
      username: 'tester-' + this.uid,
      displayName: 'tester user',
      _password: '1234',
      _roles: ['user'],
      _filter: 'test1=test2',
      workspace: this.workspace
    };
    joola.users.update(user, function (err, user) {
      if (err)
        return done(err);
      expect(user._filter).to.equal('test1=test2');
      return done(err);
    });
  });

  it("should fail updating a non existing user", function (done) {
    var user = {
      username: 'tester-' + joola.common.uuid(),
      displayName: 'tester user',
      _password: '1234',
      _roles: ['user'],
      _filter: '',
      workspace: 'test-org'
    };
    joola.users.update(user, function (err, user) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should authenticate users with correct credentials", function (done) {
    var self = this;
    var user = {
      username: 'tester-password-' + this.uid,
      displayName: 'tester user',
      _password: 'password',
      _roles: ['user'],
      _filter: '',
      workspace: this.workspace
    };
    joola.users.add(user, function (err, user) {

      joola.users.authenticate('tester-password-' + self.uid, 'password', function (err, user) {
        if (err)
          return done(err);
        if (!user)
          return done(new Error('We should have a valid user'));
        return done();
      });
    });
  });

  it("should not authenticate users with incorrect credentials", function (done) {
    joola.users.authenticate('test', 'incorrect.password', function (err, user) {
      if (err)
        return done();
      if (!user)
        return done();
      return done(new Error('This should fail'));
    });
  });
});