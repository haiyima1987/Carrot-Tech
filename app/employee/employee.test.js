'use strict';

describe('employee module', function() {

  beforeEach(module('employee'));

  describe('department controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var employeeCtrl = $controller('employeeCtrl');
      expect(employeeCtrl).toBeDefined();
    }));

  });
});