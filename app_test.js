var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

var app = require('./app');

describe('POST /login', function() {
it('user does not exist for user : "tech.sudarsan@gmail.com"', function(done) {
try {
request(app)
  .post('/login')
  .send({ email : 'tech.sudarsan111111111111@gmail.com', password :'SSSSSSSSSSSS'})
  .expect('Content-Type', /text/)
  .expect('Content-Length', '20')
  .expect(401)
  .end(function(err, res) {
    if (err) throw err;
    //Cconsole.log(res.text);
    expect(res.text).to.equal("User Does Not Exist!");
    done();
  });
  }catch(err){
    console.log("Error : "+err);
  }
  });

// it('Account is not yet activated for user : "tech.sudarsan@gmail.com"', function(done) {
// request(app)
//   .post('/login')
//   .send({ email : 'tech.sudarsan@gmail.com', password :'SSSSSSSSSSSS'})
//   .expect('Content-Type', /text/)
//   .expect('Content-Length', '29')
//   .expect(401)
//   .end(function(err, res) {
//     if (err) throw err;
//     console.log(res.text);
//     expect(res.text).to.equal("Account is not yet activated!");
//     done();
//   });
//   });

// it('Password does not matched for user : "abhishek.choudhury@ericsson.com"', function(done) {
// request(app)
//   .post('/login')
//   .send({ email : 'abhishek.choudhury@ericsson.com', password :'SSSSSSSSSSSS'})
//   .expect('Content-Type', /text/)
//   .expect('Content-Length', '26')
//   .expect(401)
//   .end(function(err, res) {
//     if (err) throw err;
//     console.log(res.text);
//     expect(res.text).to.equal("Invalid login credentials!");
//     done();
//   });
//   });

// it('Login success for user : "abhishek.choudhury@ericsson.com"', function(done) {
// request(app)
//   .post('/login')
//   .send({ email : 'abhishek.choudhury@ericsson.com', password :'AAA'})
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '85')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//     console.log(res.text);
//     //{"firstname":"Abhishek","lastname":"Choudhury","totalDevices":0,"activatedDevices":0}
//    // console.log(res.body.firstname);
//     expect(res.body.firstname).to.equal("Abhishek");
//     expect(res.body.lastname).to.equal("Choudhury");
//     expect(res.body.totalDevices).to.equal(0);
//     expect(res.body.activatedDevices).to.equal(0);
//     done();
//   });
//   });

  });