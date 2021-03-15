// import Chai / chai htto and assert
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

//force chai to use chai http
chai.use(chaiHttp);

const app = require('../index.js') // so that the server starts ok!

// This is an example HTTP POST body to test with
var examplePOSTJSON_string = '{"token":"BWdYU5yCn4gu2ImxC8RLnoUA","team_id":"TDT1N1BUG","team_domain":"londoncs","channel_id":"G01DEHHM0CF","channel_name":"privategroup","user_id":"UGWTTURBJ","user_name":"jaggiegerhardt","command":"/prototype-currww","text":"","api_app_id":"A01K7KM6XST","is_enterprise_install":"false","response_url":"https://hooks.slack.com/commands/TDT1N1BUG/1693218049094/1lAXYGD9tYnRXDVNIUEshMG5","trigger_id":"1700200013731.469056045968.b271cf419420b201b09773acb20c694a"}'

var examplePOSTJSON_JSON = JSON.parse(examplePOSTJSON_string)

var SLACK_SIGNATURE = '48ry928bj34598udfapjisdb0'

var serverURL = 'http://localhost:3000' // this is the URL of the server
var slackEventsPath = '/slack/events' // this is the event path


describe('Testing response to bolt commands', function() {
    it('Should respond to "“module syllabus" shortcut with JSON', function(done) {
        chai.request(serverURL)
                .post(slackEventsPath)
                .set('X-Slack-Signature', SLACK_SIGNATURE)   
                .send(examplePOSTJSON_string)
                .end(function(err, res) {
                    var returnBody = res.body
                        try {
                            JSON.parse(returnBody)
                            assert(1,"Received a valid JSON Object")
                            done(); // we have finished  
                        } catch(err) {
                            assert(0,"Received an INVALID JSON Object")
                            done(); // we have finished
                        }
                   })
    });
    
    it('Should respond to "get deadlines"  shortcut with JSON', function(done) {
          chai.request(serverURL)
                .post(slackEventsPath)
                .set('X-Slack-Signature', SLACK_SIGNATURE)
                .send(examplePOSTJSON_string)
                .end(function(err, res) {
                     var returnBody = res.body
                        try {
                            JSON.parse(returnBody)
                            assert(1,"Received a valid JSON Object")
                            done(); // we have finished  
                        } catch(err) {
                            assert(0,"Received an INVALID JSON Object")
                            done(); // we have finished
                        } 
                   })                
    });
    
    it('Should respond to "get current week" shortcut with JSON', function(done) {
          chai.request(serverURL)
                .post(slackEventsPath)
                .set('X-Slack-Signature', SLACK_SIGNATURE)
                .send(examplePOSTJSON_string)
                .end(function(err, res) {
                     var returnBody = res.body
                        try {
                            JSON.parse(returnBody)
                            assert(1,"Received a valid JSON Object")
                            done(); // we have finished  
                        } catch(err) {
                            assert(0,"Received an INVALID JSON Object")
                            done(); // we have finished
                        }  
                   })                  
    });
    
    it('Should respond to "open modal" shortcut with JSON', function(done) {
          chai.request(serverURL)
                .post(slackEventsPath)
                .set('X-Slack-Signature', SLACK_SIGNATURE)
                .send(examplePOSTJSON_string)        
                .end(function(err, res) {
                      var returnBody = res.body
                        try {
                            JSON.parse(returnBody)
                            assert(1,"Received a valid JSON Object")
                            done(); // we have finished  
                        } catch(err) {
                            assert(0,"Received an INVALID JSON Object")
                            done(); // we have finished
                        } 
                   })                   
    });
    
    it('Should respond to "get help" shortcut with JSON', function(done) {
          chai.request(serverURL)
                .post(slackEventsPath)
                .set('X-Slack-Signature', SLACK_SIGNATURE)
                .send(examplePOSTJSON_string)
                .end(function(err, res) {
                     var returnBody = res.body
                        try {
                            JSON.parse(returnBody)
                            assert(1,"Received a valid JSON Object")
                            done(); // we have finished  
                        } catch(err) {
                            assert(0,"Received an INVALID JSON Object")
                            done(); // we have finished
                        }  
                   })                 
    });
    
    
});
    
   