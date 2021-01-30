//=============== ADD EXPRESS =================
/*var express = require('express');
const app = express();*/

// ==== BOLT APP  AND EXPRESS RECEIVER ===========
// Require the Bolt package (github.com/slackapi/bolt)
const { App, ExpressReceiver } = require("@slack/bolt");

// Create a Bolt Receiver
const receiver = new ExpressReceiver({
  signingSecret:  process.env.SLACK_SIGNING_SECRET
});

// Create the Bolt App, using the receiver
const slack_app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN
});

 // for express route
 app = receiver.app;


 //============= Slack app event listener====
 
 // Slack command : get help
slack_app.command('/prototype-help', async ({ command, ack,respond}) => {
   // Acknowledge command request
   await ack();
   await respond({
    "blocks": [
       {
          "type": "header",
          "text": {
             "type": "plain_text",
             "text": "Welcome to prototype :tada:",
             "emoji": true
          }
       },
       {
          "type": "section",
          "text": {
             "type": "plain_text",
             "text": "Visit Prototype Home tab or type following commands to get common UOL FAQs",
             "emoji": true
          }
       },
       {
          "type": "section",
          "text": {
             "type": "plain_text",
             "text": "Following are the available commands:",
             "emoji": true
          }
       },
       {
          "type": "section",
          "text": {
             "type": "mrkdwn",
             "text": " • prototype-help : View help \n • prototype-currww : Get UOL current week \n • prototype-deadline: Get UOL module assignments deadline \n • prototype-grade: Get UOL module grade "
          }
       }
    ]
   }
   );
 });
 
// Slack command : Get current week
 slack_app.command('/prototype-currww', async ({ command, ack,respond}) => {
   // Acknowledge command request
   await ack();
   await respond({
    "blocks": [
       {
          "type": "section",
          "text": {
             "type": "plain_text",
             "text": "Current week :date: : xxx",
             "emoji": true
          }
       },		
    ]
   }
   );
 });
 
 // Slack command, get module deadline
 slack_app.command('/prototype-deadline', async ({ command, ack,respond}) => {
   // Acknowledge command request
   await ack();
   await respond({
    "blocks": [
       {
          "type": "section",
          "text": {
             "type": "plain_text",
             "text": "Assignments deadline :book: : xxx",
             "emoji": true
          }
       },		
    ]
   }
   );
 });
 
 // Slack command: get grade
 slack_app.command('/prototype-grade', async ({ command, ack,respond}) => {
   // Acknowledge command request
   await ack();
   await respond({
    "blocks": [
       {
          "type": "section",
          "text": {
             "type": "plain_text",
             "text": "Module grades :bar_chart: : xxx",
             "emoji": true
          }
       },		
    ]
   }
   );
 });
 
//=============== The routes =================

// test GET functions to check things are working
app.get('/getCurrentWeek', (req, res) => {
   res.send(getCurrentWeek());
});

app.get('/displayMyModuleGrades', (req, res) => {
   res.send(displayMyModuleGrades());
});


app.get('/displayMyModuleDeadlines', (req, res) => {
  res.send(displayMyModuleDeadlines())
});


app.get('/displayMyModuleProgress', (req, res) => {
   res.send(displayMyModuleProgress())
});

// test GET functions to check things are working
app.post('/getCurrentWeek', (req, res) => {
   console.log(req.body)
   res.send(getCurrentWeek());
});

app.post('/displayMyModuleGrades', (req, res) => {
   console.log(req.body)
   res.send(displayMyModuleGrades());
});


app.post('/displayMyModuleDeadlines', (req, res) => {
  console.log(req.body)
  res.send(displayMyModuleDeadlines())
});


app.post('/displayMyModuleProgress', (req, res) => {
   console.log(req.body)
   res.send(displayMyModuleProgress())
});


// main POST function from slack
app.post('/slackconnect', (req, res) => {
   console.log(req.body)
   res.send(req.body)
});


//=============== The Functions  =================
function getCurrentWeek() {
   var onejan = new Date(new Date().getFullYear(),0,1);
   return String(Math.ceil((((new Date() - onejan) / 86400000) + onejan.getDay()+1)/7));
}

function displayMyModuleGrades() {
    var myGrades = ['72%','34%','56%','89%','90%','72%']
   return JSON.stringify(myGrades);
}

function displayMyModuleDeadlines() {
    var myDeadlines = ['01/01/2021 - Mid Term 1','01/02/2021 - Mid Term 2','01/03/2021 - Mid Term 3','01/04/2021 - Mid Term 4','01/05/2021 - Mid Term ','01/06/2021 - Mid Term 6']
  return JSON.stringify(myDeadlines)
}

function displayMyModuleProgress() {
  var myProgress = ['SDD - 85%','Agile - 58%','Computer Security - 20%']
  return JSON.stringify(myProgress)
}

// load the DB module
var db_conn = require('./dbConnection.js');
db_conn.connectDB_Pool(); // open a DB pool for us to use


//DB call

 // EXAMPLE SQL - 'SELECT * FROM this_table'
function makeaDBCallWithSQL(theSQL) {
   db_pool.connect((err, client, release) => {
        if (err) {
            console.log('Error acquiring client', err)
            return callback(err)
        }
        client.query(theSQL, (err, result) => {
            release()
            if (err) {
                console.log('Error withe SQL Queryt', err)
                return callback(err)
            }

            return callback(null, JSON.stringify(result.rows))
        })
    }) 
}
    



//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
/*app.listen(port);
console.log('index.js','listening on ' + port + '!');*/

(async () => {
   // Start your app
   await slack_app.start(port);
 
   console.log("⚡️ Bolt app is running on "+ + port + '!');
 })();
 