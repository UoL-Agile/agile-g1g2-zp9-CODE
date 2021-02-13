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

//For inside using
function getCurrentWeek(num) {
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

// Gets the next approaching deadline.
exports.getDeadlines = function(selectedModule) {
	var mappings = [
        {module: "CM1035 - ADS1", deadlines:
                    [{ deadline: 0, task: "Checkpoint 5 --> ", date: "2021-2-8"},
                     { deadline: 1, task: "Checkpoint 6 --> ", date: "2021-2-22"},
                     { deadline: 2, task: "Final Project Submission --> ", date: "2021-3-15"}]},
        {module: "CM1015 - CM", deadlines:
                    [{ deadline: 0, task: "Checkpoint 5 --> ", date: "2021-2-8"},
                     { deadline: 1, task: "Checkpoint 6 --> ", date: "2021-2-22"},
                     { deadline: 2, task: "Final Project Submission --> ", date: "2021-3-15"}]},
        {module: "CM1020 - DM", deadlines:
                    [{ deadline: 0, task: "Checkpoint 5 --> ", date: "2021-2-8"},
                     { deadline: 1, task: "Checkpoint 6 --> ", date: "2021-2-22"},
                     { deadline: 2, task: "Final Project Submission --> ", date: "2021-3-15"}]},
        {module: "CM1025 - FCS", deadlines:
                    [{ deadline: 0, task: "Checkpoint 5 --> ", date: "2021-2-8"},
                     { deadline: 1, task: "Checkpoint 6 --> ", date: "2021-2-22"},
                     { deadline: 2, task: "Final Project Submission --> ", date: "2021-3-15"}]},
	];

    
    if(selectedModule != "slashCommand") {
        var deadlines = "No deadlines";
        var date = new Date();
        for (var i = 0; i < mappings.length; ++i) {
            if (mappings[i].module == selectedModule) {
               for (var j = 0; j < mappings[i].deadlines.length; ++j){
            
                    var deadlineDate = new Date(mappings[i].deadlines[j].date);
                    if (date <= deadlineDate)
                    {
                        deadlines = (mappings[i].deadlines[j].task + deadlineDate);
                        break;
                    }

                }
                
                return String(deadlines);
            }
        }
        
        if (deadlines == "No deadlines") {
            return deadlines;
        }
    }
    else {
        var deadlinesRes = "No deadlines";
        if (getCurrentWeek(true) != "The school term is over") {
            for (var i = 0; i < mappings.length; ++i) {
                for (var j = 0; j < mappings[i].deadlines.length; ++j) {
                    var dealinesPerModule = "";
                    dealinesPerModule = dealinesPerModule + mappings[i].deadlines[j].task + mappings[i].deadlines[j].date + "\r";
            }
            
                deadlinesRes = deadlinesRes + mappings[i].module + "\r" + dealinesPerModule;
            }
            
            return deadlinesRes;
        }
        
        return deadlinesRes;
    }
    
}

// function will get info from DB for every user
// and return it back.
exports.myWeekInfo = function() {
    var moduls = ["Module 1", "Module 2", "Module 3", "Module 4"];
    var modulsWeeks = ["week 1", "week 4", "week 10", "week 5"];
    var toRead = ["nothing", "Book 1, p. 123", "nothing", "nothing"];

    var str = "";

    for (var i = 0; i < moduls.length; i++) {
        str = str + moduls[i] + ":" + "\r" + "    Your current week is: " + modulsWeeks[i] + "\r" + "    To read at this week: " + toRead[i] + "\r";
    }

    return str;
}


exports.getMyGrades = function(selectedModule) {
    // Maybe in the future we will get this data from DB
    var myGrades = [
        {module: "CM1035 - ADS1", grade: '72%'},
        {module: "CM1015 - CM", grade: '34%'},
        {module: "CM1020 - DM", grade: '56%'},
        {module: "CM1025 - FCS", grade: '89%'}
    ];
    
    if (selectedModule != "slashCommand") {
        for (var i = 0; i < myGrades.length; i++) {
            if(selectedModule == myGrades[i].module) {
                return myGrades[i].grade;
            }
        }
    }
    else {
        var gradesRes = "";
        for (var i = 0; i < myGrades.length; i++) {
            gradesRes = gradesRes + myGrades[i].module + " --- " + myGrades[i].grade + "\r";
        }
        return gradesRes;
    }
}

exports.displayMyModuleDeadlines = function() {
    var myDeadlines = ['01/01/2021 - Mid Term 1', '01/02/2021 - Mid Term 2', '01/03/2021 - Mid Term 3', '01/04/2021 - Mid Term 4', '01/05/2021 - Mid Term ', '01/06/2021 - Mid Term 6']
    return JSON.stringify(myDeadlines)
}

exports.displayMyModuleProgress = function() {
    var myProgress = ['SDD - 85%', 'Agile - 58%', 'Computer Security - 20%']
    return JSON.stringify(myProgress)
}

exports.getMyModuls = function(module_num) {
    // Maybe in the future we will get this data from DB
    var modules = ["CM1035 - ADS1", "CM1015 - CM", "CM1020 - DM", "CM1025 - FCS"];
    return modules[module_num];
}