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
                            "block_id": "deadlines-main",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Get information about your next deadline:"
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
                            "block_id" : "grades-header",
                            "text": {
                                "type": "plain_text",
                                "text": "Grades",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "block_id": "grades-main",
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
                                            "text": fn.getMyModuls(0),
                                            "emoji": true
                                        },
                                        "value": "value-0"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": fn.getMyModuls(1),
                                            "emoji": true
                                        },
                                        "value": "value-1"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": fn.getMyModuls(2),
                                            "emoji": true
                                        },
                                        "value": "value-2"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": fn.getMyModuls(3),
                                            "emoji": true
                                        },
                                        "value": "value-3"
                                    }
                                ],
                                "action_id": "static_select-action"
                            }
                        },
                        {
                            "type": "actions",
                            "block_id": "grades-button",
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
    
    slack_app.action('deadlines_button', async ({ body, ack, client }) => {
     // Acknowledge action request
        await ack();
                
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
            
            if (body.view.blocks[i].block_id == "deadlines-main") {
                delete body.view.blocks[i].accessory;
                body.view.blocks[i].text.text = "Next Deadline: " + fn.getDeadlines();
            }           
        }        
        
        try {
            // Call views.update with the built-in client
            const result = await client.views.update({
                // Pass the view_id
                view_id: body.view.id,
                // Pass the current hash to avoid race conditions
                hash: body.view.hash,
                // View payload with updated blocks
                view: {
                    type: 'home',
                    // View identifier
                    callback_id: 'view_123',
                    blocks: body.view.blocks
                }
            });
            console.log(result);
        }
        catch (error) {
            console.log(error.data.response_metadata);
        }    
    });
  
    slack_app.action('week_button', async ({ body, ack, client }) => {
     // Acknowledge action request
        await ack();
                
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
                    type: 'home',
                    // View identifier
                    callback_id: 'view_123',
                    blocks: body.view.blocks
                }
            });
            console.log(result);
        }
        catch (error) {
            console.log(error.data.response_metadata);
        }
    
    });
  
    slack_app.action('grades_button', async ({ body, ack, client }) => {
        // Acknowledge action request
        await ack();
        
        console.log()
        
        var values = body.view.state.values;
        console.log(values);
        
        
//        for (var i = 0; i < body.view.blocks.length; i++) {            
//            if (body.view.blocks[i].block_id == "deadlines-main") {
//                delete body.view.blocks[i].accessory;
//                body.view.blocks[i].text.text = "Next Deadline: " + fn.getDeadlines();
//            }           
//        }        
//        
//        try {
//            // Call views.update with the built-in client
//            const result = await client.views.update({
//                // Pass the view_id
//                view_id: body.view.id,
//                // Pass the current hash to avoid race conditions
//                hash: body.view.hash,
//                // View payload with updated blocks
//                view: {
//                    type: 'home',
//                    // View identifier
//                    callback_id: 'view_123',
//                    blocks: body.view.blocks
//                }
//            });
//            console.log(result);
//        }
//        catch (error) {
//            console.log(error.data.response_metadata);
//        }
    });
    
    function createNiceDateForVersion(thisDate) {
        return thisDate.getFullYear() + '-' + str_pad((thisDate.getMonth() + 1)) + '-' + str_pad(thisDate.getDate()) + ' ' + str_pad(thisDate.getHours()) + ':' + str_pad(thisDate.getMinutes())
    }

    function str_pad(theNumber) {
        return ('0' + theNumber).slice(-2)
    }
}
