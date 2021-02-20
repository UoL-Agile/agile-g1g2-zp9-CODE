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

    //if num = true, then return only the week number in string format
    //else return the string str
    if (num == true) {
        //checks the current week that it is less than 22
        if (currWeek > 22) {
            return "The school term is over";
        }
        else {
            return String(currWeek);
        };
    }
    else {
        //checks the current week that it is less than 22
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

    //if num = true, then return only the week number in string format
    //else return the string str
    if (num == true) {
        //checks the current week that it is less than 22
        if (currWeek > 22) {
            return "The school term is over";
        }
        else {
            return String(currWeek);
        };
    }
    else {
        //checks the current week that it is less than 22
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
// selectedModule - module name or "slashCommand" if you want to
//return the full list or use for slash command
exports.getDeadlines = function(selectedModule) {
    //Temporary data. Next, they will be taken from the database
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

    //Selects the appearance of the data to be returned
    if(selectedModule != "slashCommand") {
        var deadlines = "No deadlines";
        var date = new Date();
        //Looking for the desired module, as in the request
        for (var i = 0; i < mappings.length; ++i) {
            if (mappings[i].module == selectedModule) {
                
                //creating string for return
               for (var j = 0; j < mappings[i].deadlines.length; ++j){
            
                    var deadlineDate = new Date(mappings[i].deadlines[j].date);
                    if (date <= deadlineDate)
                    {
                        deadlines = (mappings[i].deadlines[j].task + mappings[i].deadlines[j].date);
                        break;
                    }

                }
                
                return String(deadlines);
            }
        }
        
        //if it do not find the necessary module,
        //it returns that there are no deadlines
        if (deadlines == "No deadlines") {
            return deadlines;
        }
    }
    else { //Goes through all the data and collects it in one big row
        var deadlinesRes = "";
        
        //If the study is finished, it returns that there are no deadlines
        if (getCurrentWeek(true) != "The school term is over") {
            for (var i = 0; i < mappings.length; ++i) {
                var dealinesPerModule = "";
                for (var j = 0; j < mappings[i].deadlines.length; ++j) {
                    dealinesPerModule = dealinesPerModule + mappings[i].deadlines[j].task + mappings[i].deadlines[j].date + "\r";
            }
            
                deadlinesRes = deadlinesRes + mappings[i].module + "\r" + dealinesPerModule;
            }
            
            return deadlinesRes;
        }
        
        return "No deadlines";
    }
    
}

//Takes data from the database and returns scores for each module
// selectedModule - module name or "slashCommand" if you want to
//return the full list or use for slash command
exports.getMyGrades = function(selectedModule) {
    // Maybe in the future we will get this data from DB
    var myGrades = [
        {module: "CM1035 - ADS1", grade: '72%'},
        {module: "CM1015 - CM", grade: '34%'},
        {module: "CM1020 - DM", grade: '56%'},
        {module: "CM1025 - FCS", grade: '89%'}
    ];
    
    //Selects the appearance of the data to be returned
    if (selectedModule != "slashCommand") {
        for (var i = 0; i < myGrades.length; i++) {
            if(selectedModule == myGrades[i].module) {
                return myGrades[i].grade;
            }
        }
    }
    else { //Goes through all the data and collects it in one big row
        var gradesRes = "";
        for (var i = 0; i < myGrades.length; i++) {
            gradesRes = gradesRes + myGrades[i].module + " --- " + myGrades[i].grade + "\r";
        }
        return gradesRes;
    }
}

//returns the names of the modules from the database
exports.getMyModuls = function(module_num) {
    // Maybe in the future we will get this data from DB
    var modules = ["CM1035 - ADS1", "CM1015 - CM", "CM1020 - DM", "CM1025 - FCS"];
    return modules[module_num];
}