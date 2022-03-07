# QA-Tools
[README.md](https://github.com/Source-Digital/QA-Tools/files/8114286/README.md)

# Lambda Test Automation

This is Distribution Overlay Template automation, To check each and every SAM is clicked


## Contributing

Contributions are always welcome!

See `lembdaTest` for ways to get started.

Please adhere to this project's `code of conduct`.


## Deployment

To deploy this project run

```bash
  git commit -m lembdaTest
```


## FAQ

#### Question 1 : Which Framework is used with the Lambdatest

Answer 1: Maven TestNG 



## Features

- SAM are clicked
- VideoAd Distribution
- Cross platform

## Run

name: Lambdatest

on:
  push:
    branches: [ feature/lembdatest ]
  
  workflow_dispatch:

jobs:
  build:
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
