//=============== ADD EXPRESS =================
var express = require('express');
const app = express();
 
//=============== The routes =================
app.get('/whichWeekAreWe', (req, res) => {
  var today = new Date();
  var weekNumber = today.getWeek();
  res.send(weekNumber);
});




//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
app.listen(port);
console.log('index.js','listening on ' + port + '!');