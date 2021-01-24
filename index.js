//=============== ADD EXPRESS =================
var express = require('express');
const app = express();
 
//=============== The routes =================
app.get('/whichWeekAreWe', (req, res) => {
   var onejan = new Date(new Date().getFullYear(),0,1);
   res.send(String(Math.ceil((((new Date() - onejan) / 86400000) + onejan.getDay()+1)/7)));
});

app.get('/displayMyModuleGrades', (req, res) => {
   var myGrades = ['72%','34%','56%','89%','90%','72%']
   res.send(JSON.stringify(myGrades));
});


app.get('/displayMyModuleDeadlines', (req, res) => {
    var myDeadlines = ['01/01/2021 - Mid Term 1','01/02/2021 - Mid Term 2','01/03/2021 - Mid Term 3','01/04/2021 - Mid Term 4','01/05/2021 - Mid Term ','01/06/2021 - Mid Term 6']
  res.send(JSON.stringify(myDeadlines))
});


app.get('/displayMyModuleProgress', (req, res) => {
   var myProgress = ['SDD - 85%','Agile - 58%','Computer Security - 20%']
  res.send(JSON.stringify(myProgress))
});


//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
app.listen(port);
console.log('index.js','listening on ' + port + '!');