import angular = require('angular');

import './confirm-delete.controller';
import './select-brewing-company.controller';

import './array-utilities.service';
import './http-status.service';
import './time-series-socket.service';
import './user-service.service';

import './seconds-to-timer.filter';

import './brewery-resources.factory';
import './time-series-updater.factory';
import './user-resources.factory';

import './dial.directive';
import './icheck.directive';
import './joulia-header.directive';
import './rtd-form.directive';
import './searchable-select.directive';
import './sidebar-breweries.directive';
import './sidebar-brewery.directive';
import './sidebar-sub-menu.directive';
import './sidebar-userbox.directive';
import './toggleable-element.directive';
import './value-card.directive';

angular
  .module('app.common',
    [
      'app.common.array-utilities',
      'app.common.brewery-resources',
      'app.common.confirm-delete',
      'app.common.dial',
      'app.common.http-status',
      'app.common.icheck',
      'app.common.joulia-header',
      'app.common.rtd-form',
      'app.common.searchable-select',
      'app.common.seconds-to-timer',
      'app.common.select-brewing-company',
      'app.common.sidebar',
      'app.common.sidebar-breweries',
      'app.common.sidebar-brewery',
      'app.common.sidebar-sub-menu',
      'app.common.sidebar-userbox',
      'app.common.toggleable-element',
      'app.common.user-service',
      'app.common.user-resources',
      'app.common.time-series-socket',
      'app.common.time-series-updater',
      'app.common.value-card',
    ]);
