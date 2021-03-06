/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './sidebar.directive';

describe('app.common.sidebar', function () {
  beforeEach(angular.mock.module('app.common.sidebar'));
  beforeEach(angular.mock.module('app.templates'));

  var $rootScope, $compile, $httpBackend;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('sidebar directive', function () {
    var element, scope, isolatedScope;
    var breweryQuery, brewhouseQuery;

    beforeEach(function () {
      breweryQuery = $httpBackend.when('GET', 'brewery/api/brewery')
        .respond([]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([]);
    });

    beforeEach(function () {
      const html = `
        <sidebar
            user="user">
        </sidebar>`;
      scope = $rootScope.$new();
      scope.user = {};
      element = $compile(html)(scope);
      $httpBackend.expectGET('brewery/api/brewery');
      $httpBackend.expectGET('brewery/api/brewhouse');
      $httpBackend.flush();
      isolatedScope = element.isolateScope();
    });

    describe('template', function () {
      it('contains some template', function () {
        expect(element.html()).toContain('aside');
      })
    });

    describe('toggleSidebar', function() {
      it('broadcasts toggleSidebar', function(){
        var called = false;
        $rootScope.$on('toggleSidebar', function() {
          called = true;
        });

        isolatedScope.toggleSidebar();
        expect(called).toBeTruthy();
      });
    });

  });

});
