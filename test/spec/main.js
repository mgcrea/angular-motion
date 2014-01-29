'use strict';

describe('Animations', function() {

  beforeEach(module('ngAnimate'));

  var scope, $animate;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($rootScope, _$animate_) {
    scope = $rootScope.$new();
    $animate = _$animate_;
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect($animate).toBeDefined();
  });

});
