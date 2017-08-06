# joulia-webclient
[![Build Status](https://travis-ci.org/willjschmitt/joulia-webclient.svg?branch=develop)](https://travis-ci.org/willjschmitt/joulia-webclient) [![Coverage Status](https://coveralls.io/repos/github/willjschmitt/joulia-webclient/badge.svg?branch=develop)](https://coveralls.io/github/willjschmitt/joulia-webclient?branch=develop)

Webclient for connecting distributed users to electric brewing controller
equipment.

## Quickstart
Clone the source:
`git clone https://github.com/willjschmitt/joulia-webclient.git`

Install the dependencies:
```
npm install
bower install
```

Add the stylization from Bemat Admin. This project uses a purchased license of Bemat Admin from Wrap Bootstrap. Purchase a license of [Bemat](https://wrapbootstrap.com/theme/bemat-material-design-admin-template-WB042J880) for your use from WrapBootstrap. As of this writing, the licenses for single-use were $10. Unzip the Bemat package and place the `js`,`css`, and `vendor` directories into the `vendor/bemat-admin` directory.

Add the stylization from Ultimate Flat. This project uses a purchased license of Ultimate Flat from Wrap Bootstrap. Purchase a license of [Ultimate Flat](https://wrapbootstrap.com/theme/ultimate-flat-onepage-template-WB0353FX3) for your use from WrapBootstrap. As of this writing, the licenses for single-use were $12. Unzip the Ultimate Flatpackage and place the directories into the `vendor/ultimate-flat` directory.

Note: a few css files from licensed sources have http:// @imports for FontAwesome and Google fonts. They should be replaced with https:// if operating in SSL, since mixed content is not permitted to be loaded when loading an SSL page.

## Project Information
This project is based on one web framework:
* [AngularJS](https://angularjs.org/) - Dynamic frontend Javascript framework, allowing for asynchronous page operations. Communicates with backend primarily over REST and other XHR operations.

## Related Projects
This project is part of the series of projects for the Joulia Brewing System:
* [joulia-webclient](https://github.com/willjschmitt/joulia-webclient) - This
project.
* [joulia-webserver](https://github.com/willjschmitt/joulia-webserver) - The
backend server, providing a backing datastore, livestreaming service, and user
authentication.
* [joulia-controller](https://github.com/willjschmitt/joula-controller) -
Brewhouse control system for controling the physical brewhouse equipment.
* joulia-fermentation - Planned project to control the femermentation operations.

## Licensing
Copyright 2017 William Schmitt. All Rights Reserved.

The intention is to make this project open-sourced, but at this moment is maintained under personal copyright until a few things can be worked through.
