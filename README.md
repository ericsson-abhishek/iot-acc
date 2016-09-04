# iot-acc
The project contains a very lean prototype of `IoT as a service` concept.
We named it as `iot-acc` - as an accelerated version of hostting and publish iot related services

The primary languge used for development is `NodeJS`.
For UI development we are using `SCSS` and for the backand datastore `Mongo DB` is used.

Here are some important information to setup the source code in local system.

## Build tool
The project uses `GULP` to build the UI and JS. The corresponding tasks are already included in the Project.

## NPM Dependencies
The project includes following npm dependencies
* gulp - for the build tool
* browserify - for porting the JS code to UI
* vinyl-source-stream- for streaming the `browserify` output
* gulp-ruby-sass - for compiling the Sass/Scss code to CSS ( please check the pre-requisites)
* jquery
* underscore

## Pre-requisites
* Install `RUBY` ( version 2.0 or later)
* Install `SASS`

## Instructions for running the applciaiton in Local env
* Clone the project
* run `npm install` to install the dependencies
* run `npm install -g gulp`
* run `gulp watch` to build/compile the JS and CSS
