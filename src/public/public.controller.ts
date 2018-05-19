import angular = require('angular');

import './public-about.directive';
import './public-header.directive';
import './public-join.directive';
import './public-features.directive';
import './public-mobile.directive';
import './public-screenshots.directive';
import './public-sidebar.directive';

angular
  .module('app.public.controller',
    [
      'app.public.about',
      'app.public.header',
      'app.public.join',
      'app.public.features',
      'app.public.mobile',
      'app.public.screenshots',
      'app.public.sidebar',
    ])
  .controller('PublicController', PublicController);

PublicController.$inject = [];

function PublicController() {}
