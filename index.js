//=============== ADD EXPRESS =================
var express = require('express');
const app = express();
 
//=============== The routes =================
app.get('/whichWeekAreWe', (req, res) => {
   var onejan = new Date(new Date().getFullYear(),0,1);
   res.send(String(Math.ceil((((new Date() - onejan) / 86400000) + onejan.getDay()+1)/7)));
});


//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
app.listen(port);
console.log('index.js','listening on ' + port + '!');