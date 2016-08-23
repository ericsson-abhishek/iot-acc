# node-front-end
The project contains bare minimum setup for working with Front-End Application using `NodeJS` to build the application.
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

## Installtion & Running
* Clone the project
* run `npm install` to install the dependencies
* run `npm install -g gulp`
* run `gulp watch` to build/compile the JS and CSS