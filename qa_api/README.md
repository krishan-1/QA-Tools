# QA API
[![Ruby Style Guide](https://img.shields.io/badge/code_style-rubocop-brightgreen.svg)](https://github.com/rubocop-hq/rubocop)
[![Ruby Style Guide](https://img.shields.io/badge/code_style-community-brightgreen.svg)](https://rubystyle.guide)

# Prerequisites 
* Ruby - 2.7.1
* Rails - 6.0.3
* yarn

# Development Prerequisites
* sqlite3 - ~> 1.4
* Curl or Postman for testing manually

# Production Prerequisites
* PostgreSQL
* NGINX
* Passenger

# Steps to run locally
* Make sure you have to dev prerequisites
* ```bundle install``` - this installs all required gems
* ```rails db:migrate``` - this will create the database and add the tables
* ```yarn install```
* ```rails s``` - this will start rails on port 3000
    * ```rails s -p {your port number}``` - will run rails on a different port of your choice

# How to add view components
* create you component in ```app/javascript/componets``` you can add subdirectories
* in ```app/javascript/packs/hello_vue``` and the following line ```Vue.component('{the tag you want to use}', 
{componetName}``` - dont forget to import you component first
* Now you can add the component to the home page by add you tag to ```app/views/home/index.html.erb``` - example ```<my-tag></my-tag>```

# How to modify tests directory
* the test controller is located under ```app/controlers/tests_controller.rb``` modify this to add or modify functionality
* To add fields to the tests object run ```rails g migration add_whatever_to_tests``` then modify the migrations file then run ```rails db:migrate```

# How to run on server
* check out the following link https://gorails.com/deploy/ubuntu/20.04

# linting rules
* We use RuboCop. You can learn more about them here https://github.com/rubocop-hq/rubocop