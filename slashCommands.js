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
                        "text": "Welcome to Pathfinder :tada:",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Visit " + `<slack://app?team=${workspaceid}&id=${process.env.SLACK_APP_ID}|*Pathfinder Home tab*>` +" or type the following commands to get common UoL FAQs"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " • pathfinder-help : View helpful tips \n • pathfinder-week : Get current course week \n • pathfinder-deadline: Get course module assignment deadlines \n • pathfinder-grade: Get course module grade "
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
    slack_app.shortcut('pathfinder_uol_shortcut', async ({
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
                        text: "Pathfinder UoL"
                    },
                    close: {
                        type: "plain_text",
                        text: "Close"
                    },
                    blocks: [{
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "Visit " + `<slack://app?team=${workspaceid}&id=${process.env.SLACK_APP_ID}|*Pathfinder*>` +
                                " bot page to get: \n • Current week \n • Assignment deadlines \n • Module grades"
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
