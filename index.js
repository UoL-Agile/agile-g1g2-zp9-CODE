//=============== ADD EXPRESS =================
var express = require('express');
const app = express();
 
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



//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
app.listen(port);
console.log('index.js','listening on ' + port + '!');