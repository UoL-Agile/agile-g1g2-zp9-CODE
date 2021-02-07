module.exports = function(slack_app) {
    
    var fn = require("./functions.js");
    
    slack_app.event('app_home_opened', async ({
        event,
        client,
        context
    }) => {
        try {
            /* view.publish is the method that your app uses to push a view to the Home tab */
            const result = await client.views.publish({

                /* the user that opened your app's app home */
                user_id: event.user,

                /* the view object that appears in the app home*/
                view: {
                    type: 'home',
                    callback_id: 'home_view',

                    /* body of the view */
                    "blocks": [{
                            "type": "header",
                            "text": {
                                "type": "plain_text",
                                "text": "👋 Welcome!",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "block_id": "qWs",
                            "text": {
                                "type": "mrkdwn",
                                "text": "This is a home for the Prototype application. Here you can check your university course progress!    Version Dated: " + createNiceDateForVersion(new Date())
                            }
                        },
                        {
                            "type": "divider"
                        },

                        /* Deadlines section */
                        {
                            "type": "header",
                            "text": {
                                "type": "plain_text",
                                "text": "Deadlines",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Use the calendar to look for deadlines within the time period:"
                            },
                            "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": ":exclamation:  Display deadlines",
                                    "emoji": true
                                },
                                "value": "click_me_123",
                                "action_id": "deadlines_button"
                            }
                        },
                        {
                            "type": "actions",
                            "elements": [{
                                    "type": "datepicker",
                                    "initial_date": "2021-01-01",
                                    "placeholder": {
                                        "type": "plain_text",
                                        "text": "Select a date",
                                        "emoji": true
                                    },
                                    "action_id": "start_date_button"
                                },
                                {
                                    "type": "datepicker",
                                    "initial_date": "2021-01-01",
                                    "placeholder": {
                                        "type": "plain_text",
                                        "text": "Select a date",
                                        "emoji": true
                                    },
                                    "action_id": "end_date_button"
                                }
                            ]
                        },
                        {
                            "type": "divider"
                        },

                        /* Week section */
                        {
                            "type": "header",
                            "block_id": "week-header",
                            "text": {
                                "type": "plain_text",
                                "text": "Current Week",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "block_id": "week-main",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Get information about the current week:"
                            },
                            "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": ":date:  Display current week",
                                    "emoji": true
                                },
                                "value": "click_me_123",
                                "action_id": "week_button"
                            }
                        },
                        {
                            "type": "divider"
                        },

                        /* Grades section */
                        {
                            "type": "header",
                            "text": {
                                "type": "plain_text",
                                "text": "Grades",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Select a module from the list:"
                            },
                            "accessory": {
                                "type": "static_select",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Select an item",
                                    "emoji": true
                                },
                                "options": [{
                                        "text": {
                                            "type": "plain_text",
                                            "text": "*Module 1*",
                                            "emoji": true
                                        },
                                        "value": "value-0"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "*Module 2*",
                                            "emoji": true
                                        },
                                        "value": "value-1"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "*Module 3*",
                                            "emoji": true
                                        },
                                        "value": "value-2"
                                    }
                                ],
                                "action_id": "static_select-action"
                            }
                        },
                        {
                            "type": "actions",
                            "elements": [{
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": ":bar_chart:  Display grades",
                                    "emoji": true
                                },
                                "value": "click_me_123",
                                "action_id": "grades_button"
                            }]
                        },
                        {
                            "type": "divider"
                        }
                    ]
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
    
    slack_app.action('deadlines_button', async ({ body, ack, say }) => {
     // Acknowledge action request
     await ack();
     await say('Deadlines button clicked 👍');
    });
  
    slack_app.action('week_button', async ({ body, ack, client }) => {
     // Acknowledge action request
        await ack();
        
//        body.view.blocks[0].type = "check";
        
        for (var i = 0; i < body.view.blocks.length; i++) {            
            var keys1 = Object.keys(body.view.blocks[i]);
            console.log("1 keys: " + keys1);
            for (var j = 0; j < keys1.length; j++) {
                if(keys1[j] == "text") {
                    var keys2 = Object.keys(body.view.blocks[i].text);
                    console.log("2 keys: " + keys2);
                    for (var q = 0; q < keys2.length; q++) {
                        if(keys2[q] == "verbatim") {
                            console.log(body.view.blocks[i].text);
                            delete body.view.blocks[i].text.verbatim;
                            console.log(body.view.blocks[i].text);
                        }
                    }
                }
            }
            
            if(body.view.blocks[i].block_id == "week-main") {
                delete body.view.blocks[i].accessory;
                body.view.blocks[i].text.text = "Current week: " + fn.getCurrentWeek(true);
            }
            
        }
        
//        var string = JSON.strigify(body.view.blocks);
        
//        console.log(body.view.blocks);
//        //can use for understanding which date the use chose
//        console.log(body.view.state.values);
        
        
        try {
            // Call views.update with the built-in client
            const result = await client.views.update({
                // Pass the view_id
                view_id: body.view.id,
                // Pass the current hash to avoid race conditions
                hash: body.view.hash,
                // View payload with updated blocks
                view: {
                    type: 'modal',
                    // View identifier
                    callback_id: 'view_123',
                    blocks: [body.view.blocks]
                }
            });
            console.log(result);
        }
        catch (error) {
            console.error(error.response_metadata);
        }
    
    });
  
    slack_app.action('grades_button', async ({ body, ack, say }) => {
     // Acknowledge action request
     await ack();
     await say('Grades button clicked 👍');
    });
    
    function createNiceDateForVersion(thisDate) {
        return thisDate.getFullYear() + '-' + str_pad((thisDate.getMonth() + 1)) + '-' + str_pad(thisDate.getDate()) + ' ' + str_pad(thisDate.getHours()) + ':' + str_pad(thisDate.getMinutes())
    }

    function str_pad(theNumber) {
        return ('0' + theNumber).slice(-2)
    }
}