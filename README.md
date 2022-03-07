# This is a basic workflow to help you get started with Actions

name: Lambdatest

on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ feature/lembdatest ]
  

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Step 1 - Checkout feature/lambdatest on github
        uses: actions/checkout@v2

    # Runs a single command using the runners shell
      - name: Step 2 - Setup JDK 17
        uses: actions/setup-java@v1
        with:
           java-version: 17   

      # Runs a set of commands using the runners shell
      - name: Step 3 - Have github action to build  maven project
        run: cd LembdaTest && mvn -B package --file pom.xml 
        
      - name Step 4 - Run Maven project 
      - run: cd lembdaTest && mvn clean install
