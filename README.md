# joulia-webserver
[![Build Status](https://travis-ci.org/willjschmitt/joulia-webserver.svg?branch=develop)](https://travis-ci.org/willjschmitt/joulia-webserver) [![Coverage Status](https://coveralls.io/repos/github/willjschmitt/joulia-webserver/badge.svg)](https://coveralls.io/github/willjschmitt/joulia-webserver)

Webserver and logging for electric brewing controller connecting distributed users to the equipment.

## Quickstart
Clone the source:
`git clone https://github.com/willjschmitt/joulia-webserver.git`

Install the dependencies:
`pip install -r requirements.txt`

Create a database and change your database settings to connect to your instance in settings.py. See the [django docs](https://docs.djangoproject.com/en/1.9/ref/settings/#std:setting-DATABASES) for more information. If using AWS Elastic Beanstalk with an RDS instance, the settings will pull the database information from the environment variables set by EBS.

Migrate the database to create the database schema using the django management tools:
`python manage.py migrate`

Add the stylization from Bemat Admin. This project uses a purchased license of Bemat Admin from Wrap Bootstrap. Purchase a license of [Bemat](https://wrapbootstrap.com/theme/bemat-material-design-admin-template-WB042J880) for your use from WrapBootstrap. As of this writing, the licenses for single-use were $10. Unzip the Bemat package and place the `js`,`css`, and `vendor` directories into the `components/bemat-admin` directory.

Run the server:
`python main.py`

## Project Information
This project is based on several web frameworks:
* [django](https://www.djangoproject.com/) - Forms the main basis of the web backend. Defines the database models and manages migrations for the database schema.
* [django-rest-framework](http://www.django-rest-framework.org/) - django plugin to serve REST APIs for many of the core views in the django site.
* [tornado](http://www.tornadoweb.org/en/stable/) - Asynchronous framework to run the outer io loop for the webserver. Fallsback to django for unkwown URLs. Primarily allows for real-time streaming of data between clients over websockets and/or long-polling.
* [AngularJS](https://angularjs.org/) - Dynamic frontend Javascript framework, allowing for asynchronous page operations. Communicates with backend primarily over REST and other XHR operations.

## Related Projects
This project is part of the series of projects for the Joulia Brewing System:
* [joulia-webserver](https://github.com/willjschmitt/joulia-webserver) - This project.
* [joulia-controller](https://github.com/willjschmitt/joula-controller) - Brewhouse control system for controling the brewday operations.
* joulia-fermentation - Planned project to control the femermentation operations.

## Licensing
Copyright 2016 William Schmitt. All Rights Reserved.

The intention is to make this project open-sourced, but at this moment is maintained under personal copyright until a few things can be worked through.
