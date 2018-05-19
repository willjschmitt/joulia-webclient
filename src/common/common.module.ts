import angular = require('angular');

import 'angular-resource';
import 'angular-websocket';
import 'angular-ui-bootstrap';
import 'ui-select';

import '../templates';

import {ConfirmDeleteController} from './confirm-delete.controller';
import {SelectBrewingCompanyController} from './select-brewing-company.controller';

import {arrayUtilities} from './array-utilities.service';
import {httpStatus} from './http-status.service';
import {timeSeriesSocket} from './time-series-socket.service';
import {userService} from './user-service.service';

import {secondsToTimerFilter} from './seconds-to-timer.filter';

import {breweryResources} from './brewery-resources.factory';
import {TimeSeriesUpdaterFactory} from './time-series-updater.factory';
import {userResources} from './user-resources.factory';

import {dial} from './dial.directive';
import {icheck} from './icheck.directive';
import {jouliaHeader} from './joulia-header.directive';
import {rtdForm} from './rtd-form.directive';
import {searchableSelect} from './searchable-select.directive';
import {sidebarBreweries} from './sidebar-breweries.directive';
import {sidebarBrewery} from './sidebar-brewery.directive';
import {sidebarSubMenu} from './sidebar-sub-menu.directive';
import {sidebarUserbox} from './sidebar-userbox.directive';
import {sidebar} from './sidebar.directive';
import {toggleableElement} from './toggleable-element.directive';
import {valueCard} from './value-card.directive';

angular
  .module('app.common',
      ['ngResource', 'ngWebSocket', 'ui.bootstrap', 'ui.select'])

  .service('arrayUtilities', arrayUtilities)
  .service('httpStatus', httpStatus)
  .service('timeSeriesSocket', timeSeriesSocket)
  .service('userService', userService)

  .filter('secondsToTimer', secondsToTimerFilter)

  .factory('breweryResources', breweryResources)
  .factory('TimeSeriesUpdater', TimeSeriesUpdaterFactory)
  .factory('userResources', userResources)

  .controller('ConfirmDeleteController', ConfirmDeleteController)
  .controller('SelectBrewingCompanyController', SelectBrewingCompanyController)

  .directive('dial', dial)
  .directive('icheck', icheck)
  .directive('jouliaHeader', jouliaHeader)
  .directive('rtdForm', rtdForm)
  .directive('searchableSelect', searchableSelect)
  .directive('sidebarBreweries', sidebarBreweries)
  .directive('sidebarBrewery', sidebarBrewery)
  .directive('sidebarSubMenu', sidebarSubMenu)
  .directive('sidebarUserbox', sidebarUserbox)
  .directive('sidebar', sidebar)
  .directive('toggleableElement', toggleableElement)
  .directive('valueCard', valueCard);
