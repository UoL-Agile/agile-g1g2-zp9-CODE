module.exports = function(slack_app) {

    // Slack command : get help
    slack_app.command('/prototype-help', async ({
        command,
        ack,
        respond
    }) => {
        // Acknowledge command request
        await ack();
        await respond({
            "blocks": [{
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
        });
    });

    // Slack command : Get current week
    slack_app.command('/prototype-currww', async ({
        command,
        ack,
        respond
    }) => {
        // Acknowledge command request
        await ack();
        await respond({
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "Current week :date: : " + getCurrentWeek(true),
                    "emoji": true
                }
            }, ]
        });
    });

    // Slack command, get module deadline
    slack_app.command('/prototype-deadline', async ({
        command,
        ack,
        respond
    }) => {
        // Acknowledge command request
        await ack();
        await respond({
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "Assignments deadline :book: : xxx",
                    "emoji": true
                }
            }, ]
        });
    });

    // Slack command: get grade
    slack_app.command('/prototype-grade', async ({
        command,
        ack,
        respond
    }) => {
        // Acknowledge command request
        await ack();
        await respond({
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "Module grades :bar_chart: : xxx",
                    "emoji": true
                }
            }, ]
        });
    });

    // The open_modal shortcut opens a plain old modal
    slack_app.shortcut('prototype_uol_shortcut', async ({
        shortcut,
        ack,
        client
    }) => {
        try {
            // Acknowledge shortcut request
            await ack();
            // Call the views.open method using one of the built-in WebClients
            const workspaceid = "TDT1N1BUG";
            const result = await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: {
                    type: "modal",
                    title: {
                        type: "plain_text",
                        text: "Prototype"
                    },
                    close: {
                        type: "plain_text",
                        text: "Close"
                    },
                    blocks: [{
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "Visit " + `<slack://app?team=${workspaceid}&id=${process.env.SLACK_APP_ID}|*Prototype*>` +
                                " bot now to get: \n • current week \n • assignment deadline \n • module grades"
                        }
                    }, ]
                }
            });

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    });
    
    
    // Action listener: current week
    slack_app.action('button-action', async ({
        ack,
        say
    }) => {
        // Acknowledge command request
        await ack();
        console.log("check");
        await say('Is it work?');
    });
    

    //=============== The Functions  =================

    //if num = true, then return only the week number in string format
    //else return the string str
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

    // function will get info from DB for every user
    // and return it back.
    function myWeekInfo() {
        var moduls = ["Modle 1", "Modle 2", "Modle 3", "Modle 4"];
        var modulsWeeks = ["week 1", "week 4", "week 10", "week 5"];
        var toRead = ["nothing", "Book 1, p. 123", "nothing", "nothing"];

        var str = "";

        for (var i = 0; i < moduls.length; i++) {
            str = str + moduls[i] + ":" + "\r" + "    Your current week is: " + modulsWeeks[i] + "\r" + "    To read at this week: " + toRead[i] + "\r";
        }

        return str;
    }


    function displayMyModuleGrades() {
        var myGrades = ['72%', '34%', '56%', '89%', '90%', '72%']
        return JSON.stringify(myGrades);
    }

    function displayMyModuleDeadlines() {
        var myDeadlines = ['01/01/2021 - Mid Term 1', '01/02/2021 - Mid Term 2', '01/03/2021 - Mid Term 3', '01/04/2021 - Mid Term 4', '01/05/2021 - Mid Term ', '01/06/2021 - Mid Term 6']
        return JSON.stringify(myDeadlines)
    }

    function displayMyModuleProgress() {
        var myProgress = ['SDD - 85%', 'Agile - 58%', 'Computer Security - 20%']
        return JSON.stringify(myProgress)
    }

}