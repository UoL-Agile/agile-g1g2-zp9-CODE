const workspaceid = "TDT1N1BUG";

module.exports = function(slack_app) {
    
    //import main functions
    var fn = require("./functions.js");
    
    // Slack command : get help
    slack_app.command('/pathfinder-help', async ({
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
                        "type": "mrkdwn",
                        "text": "Visit " + `<slack://app?team=${workspaceid}&id=${process.env.SLACK_APP_ID}|*Prototype Home tab*>` +" or type following commands to get common UOL FAQs"
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
    slack_app.command('/pathfinder-week', async ({
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
                    "text": "Current week :date: : Week " + fn.getCurrentWeek(true),
                    "emoji": true
                }
            }, ]
        });
    });

    // Slack command, get module deadline
    slack_app.command('/pathfinder-deadline', async ({
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
                    "text": "Assignments deadline :book: : \r" + fn.getDeadlines("slashCommand"),
                    "emoji": true
                }
            }, ]
        });
    });

    // Slack command: get grade
    slack_app.command('/pathfinder-grade', async ({
        command,
        ack,
        respond
    }) => {
        // Acknowledge command request
        await ack();
        const grades = fn.getMyGrades("slashCommand").split("\r");
        gradeText = ""
        grades.forEach(element => {
            if(( element.trim() != "")){
                gradeText += "• " + element + "\n";
            }        
        });

        await respond({
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "Module grades :bar_chart: : \r",
                    "emoji": true
                }
            }, 
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": gradeText
                }
            }
        ]
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
    
    


    
       
}
