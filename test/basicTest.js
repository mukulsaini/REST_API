"use strict"

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Emissions', () => {
    beforeEach((done) => { //Before each test we empty the database
      console.log("Test For Emissions");
      done();
    });
    /*
      * Test the /GET route
      */
      describe('/GET electricity', () => {
          it('it should GET carbon emissions from electricity in kg', (done) => {
            chai.request(app)
                .get('/api/electricity?apikey=asdasjsdgfjkjhg&use=2.4&country=UK')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                  done();
                });
          });
      });

      describe('/GET naturalGas', () => {
          it('it should GET carbon emissions from naturalGas in kg', (done) => {
            chai.request(app)
                .get('/api/naturalGas?apikey=asdasjsdgfjkjhg&use=4.6&country=UK')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                  done();
                });
          });
      });
});
