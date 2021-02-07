//=============== The Functions  =================

//if num = true, then return only the week number in string format
//else return the string str
exports.getCurrentWeek = function(num) {
    //The date of the first week in format
    //{YYYY-MM-DD}T{HH:MM:SS.MsMsMs}Z in GMT +00
    var firstWeek = new Date("2020-10-12T00:00:00.000Z");
    //current date of the client
    var currDate = new Date();
    //current week
    var currWeek = Math.ceil(((currDate - firstWeek) / 86400000) / 7);


    if (num == true) {
        if (currWeek > 22) {
            return "The school term is over";
        }
        else {
            return String(currWeek);
        };
    }
    else {
        if (currWeek > 22) {
            return "The school term is over";
        }
        else {
            var str = "Today is " + String(currWeek) + " week!";

            return str + "\r" + myWeekInfo();
        };  
    };


}

// function will get info from DB for every user
// and return it back.
exports.myWeekInfo = function() {
    var moduls = ["Modle 1", "Modle 2", "Modle 3", "Modle 4"];
    var modulsWeeks = ["week 1", "week 4", "week 10", "week 5"];
    var toRead = ["nothing", "Book 1, p. 123", "nothing", "nothing"];

    var str = "";

    for (var i = 0; i < moduls.length; i++) {
        str = str + moduls[i] + ":" + "\r" + "    Your current week is: " + modulsWeeks[i] + "\r" + "    To read at this week: " + toRead[i] + "\r";
    }

    return str;
}


exports.displayMyModuleGrades = function() {
    var myGrades = ['72%', '34%', '56%', '89%', '90%', '72%']
    return JSON.stringify(myGrades);
}

exports.displayMyModuleDeadlines = function() {
    var myDeadlines = ['01/01/2021 - Mid Term 1', '01/02/2021 - Mid Term 2', '01/03/2021 - Mid Term 3', '01/04/2021 - Mid Term 4', '01/05/2021 - Mid Term ', '01/06/2021 - Mid Term 6']
    return JSON.stringify(myDeadlines)
}

exports.displayMyModuleProgress = function() {
    var myProgress = ['SDD - 85%', 'Agile - 58%', 'Computer Security - 20%']
    return JSON.stringify(myProgress)
}

