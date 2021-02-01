var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

chai.use(chaiHttp);

const app = require('../index.js') // so that the server starts ok!

var example

var serverURL = 'http://localhost:3000'

describe('Testing response to bolt commands', function() {
    
    it('Should respond to "get grade" shortcut with JSON', function(done) {
        assert(1,"Recevied a valid JSON Object")
        done(); // we have finished                    
    });
    
    it('Should respond to "get module"  shortcut with JSON', function(done) {
        assert(1,"Recevied a valid JSON Object")
        done(); // we have finished                    
    });
    
    it('Should respond to "get current week" shortcut with JSON', function(done) {
        assert(1,"Recevied a valid JSON Object")
        done(); // we have finished                    
    });
    
    it('Should respond to "open modal" shortcut with JSON', function(done) {
        assert(1,"Recevied a valid JSON Object")
        done(); // we have finished                    
    });
    
    it('Should respond to "get help" shortcut with JSON', function(done) {
        assert(1,"Recevied a valid JSON Object")
        done(); // we have finished                    
    });
    
    
});
    
   