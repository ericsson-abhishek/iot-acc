var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

var app = require('./app');

var Enterprise = require("./app/modules/db/models/enterprise");
var Device = require("./app/modules/db/models/device");
var sinon = require('sinon');
var Token = require('./app/modules/db/models/token');
var crypto = require("crypto-js");
var mocha = require('mocha')
var jwt = require("./app/modules/middleware/services/jwt");

// describe('POST /login', function() {
// it('user does not exist for user : "tech.sudarsan@gmail.com"', function(done) {
// try {
// request(app)
//   .post('/login')
//   .send({ email : 'tech.sudarsan111111111111@gmail.com', password :'SSSSSSSSSSSS'})
//   .expect('Content-Type', /text/)
//   .expect('Content-Length', '20')
//   .expect(401)
//   .end(function(err, res) {
//     if (err) throw err;
//     //Cconsole.log(res.text);
//     expect(res.text).to.equal("User Does Not Exist!");
//     done();
//   });
//   }catch(err){
//     console.log("Error : "+err);
//   }
//   });

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
//   });


describe('GET /enterprise', function() {
it('Query : "abhishek.choudhury@ericsson.com"', function(done) {

var tempTokenHash = '549249e359efa5352914c0d6161a0ee4'

//stub find token method
var tokenStub = function() { 
    console.log('Inside token stub method');
    return new Promise(function(resolve,reject){
        resolve(new Token({'tokenHash' : tempTokenHash}));
});
}

//stub jwtGenerateTokenStub method
var jwtGenerateTokenStub = function(){
    console.log('Inside jwtGenerateTokenStub stub method');
    return new Promise(function(resolve,reject){
        resolve("57ea63ef7cf6662d0c2a0f8e");
    });
}

//stub query enterprise method
var enterpriseStub = function() { 
    console.log('Inside enterprise stub method');
    return new Promise(function(resolve,reject){
        resolve({firstname : "Sudarsan", password :"SSS", lastname:"Sahoo",username:"SSSS"});
});
}

//stub query devices method
var deviceStub = function() { 
    console.log('Inside device stub method');
    return new Promise(function(resolve,reject){
        resolve([{status:true},{status:false}]);
});
}

Token.findOne = tokenStub;
jwt.getUserInfoFromJWT = jwtGenerateTokenStub;
Enterprise.findOne = enterpriseStub;
Device.find = deviceStub;

request(app)
  .get('/enterprise')
  .set('Bearer','549249e359efa5352914c0d6161a0ee4')
  .set("enterpriseId","57dfe3f6d6bb535c106cde5e")
  .expect('Content-Type', /json/)
  .expect('Content-Length', '80')
  .expect(200)
  .end(function(err,res){
    console.log(res.body);
    expect(res.body.firstname).to.equal("Sudarsan");
    expect(res.body.lastname).to.equal("Sahoo");
    expect(res.body.totalDevices).to.equal(2);
    expect(res.body.activatedDevices).to.equal(1);
  })
  done();
  });
  });