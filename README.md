# REST API in Node.js 

A simple rest api example for calculating carbon footrpints from various sources.

Authentication has been done using [passport.js](http://passportjs.org/) localapikey on every request

[Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) is used to carry out the test cases

THe app is deployed on [Heroku](https://www.heroku.com/). 

### Running on Browser
* To get the emission of carbon by amount of electricity used in a country:

```https://node-restapi.herokuapp.com/api/electricity?apikey=asdasjsdgfjkjhg&use=2.4&country=UK```
* To get the emission of carbon by amount of natural gas used in a country : 

```https://node-restapi.herokuapp.com/api/naturalGas?apikey=asdasjsdgfjkjhg&use=2.4&country=UK```
