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

jobs:
  build:
    runs-on: window-latest

    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 17
        uses: actions/setup-java@v2
        with:
          java-version: '17'
          distribution: 'adopt'
      - name: Build with Ant
        run: ant -noinput -buildfile build.xml
