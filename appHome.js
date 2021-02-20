module.exports = function(slack_app) {
    
    //import main functions
    var fn = require("./functions.js");
    
    //Creating the main appearance of the home page and creating its template 
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
                            "block_id": "deadlines_main",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Select the module and get information about your next deadline:"
                            },
                            "accessory": {
                                "type": "static_select",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Select a module",
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
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "All modules",
                                            "emoji": true
                                        },
                                        "value": "value-4"
                                    }
                                ],
                                "action_id": "deadlines_select"
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
                            "block_id" : "grades_header",
                            "text": {
                                "type": "plain_text",
                                "text": "Grades",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
                            "block_id": "grades_main",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Select a module from the list for showing your grades:"
                            },
                            "accessory": {
                                "type": "static_select",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Select a module",
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
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "All modules",
                                            "emoji": true
                                        },
                                        "value": "value-4"
                                    }
                                ],
                                "action_id": "grades_select"
                            }
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
    
    
//////////////////////////////////////////////////////////////////////
//////////////////-- Home Page Listeners --///////////////////////////
//////////////////////////////////////////////////////////////////////
    
    //Listener for the deadline selection menu
    slack_app.action('deadlines_select', async ({ body, ack, client }) => {
     // Acknowledge action request
        await ack();
        
        //Takes the user-selected module
        var selectedModule = body.view.state.values.deadlines_main.deadlines_select.selected_option.text.text;
        
        //Checks if all modules are selected
        //This determines how the data for the return will be generated
        if(selectedModule != "All modules") {
            
            //Select the desired part of the "body"
            //where to insert the resulting data
            for (var i = 0; i < body.view.blocks.length; i++) { 
                if (body.view.blocks[i].block_id == "deadlines_main") {
                    
                    //Checks whether the module exists
                    //in the "body" with the given ID
                    if(body.view.blocks[i+1].block_id != "deadlines_result") {
                        
                        //Saves data after the desired block
                        var divider = [];
                        for (var j = i+1; j < body.view.blocks.length; j++) {
                            divider.push(body.view.blocks[j]);
                        }
                        
                        //Deletes data after the desired block
                        body.view.blocks.splice(i+1);
                        
                        //Inserts data after the selected block
                        body.view.blocks.push({"type": "section",
                                                "block_id": "deadlines_result",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Deadlines for " + selectedModule + ": \r" + fn.getDeadlines(selectedModule)
                                                }});
                        
                        //Returns the previously deleted data
                        for (var j = 0; j < divider.length; j++) {
                            body.view.blocks.push(divider[j]);
                        }
                        
                    }
                    else { //Inserts data into an existing block
                        var textRes = body.view.blocks[i+1].text.text;
                        body.view.blocks[i+1].text.text = textRes + "\r" + selectedModule + ": \r" + fn.getDeadlines(selectedModule);
                    }
                }           
            }
        }
        else {
            //Select the desired part of the "body"
            //where to insert the resulting data
            for (var i = 0; i < body.view.blocks.length; i++) { 
                if (body.view.blocks[i].block_id == "deadlines_main") {
                    
                    //Checks whether the module exists
                    //in the "body" with the given ID
                    if(body.view.blocks[i+1].block_id != "deadlines_result") {
                        
                        //Saves data after the desired block
                        var divider = [];
                        for (var j = i+1; j < body.view.blocks.length; j++) {
                            divider.push(body.view.blocks[j]);
                        }
                        
                        //Deletes data after the desired block
                        body.view.blocks.splice(i+1);
                        
                        //Inserts data after the selected block
                        body.view.blocks.push({"type": "section",
                                                "block_id": "deadlines_result",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Your deadlines for all modules: \r" + fn.getDeadlines("slashCommand")
                                                }});
                        
                        //Returns the previously deleted data
                        for (var j = 0; j < divider.length; j++) {
                            body.view.blocks.push(divider[j]);
                        }
                    }
                    else {
                        //Inserts data into an existing block
                        var textRes = body.view.blocks[i+1].text.text;
                        body.view.blocks[i+1].text.text = textRes + "\r" + "Your deadlines for all modules" + "\r" + fn.getDeadlines("slashCommand");
                    }
                }           
            }
        }
        
        //Redrawing the main menu with the changes made
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
        }
        catch (error) {
            console.log(error);
        }    
    });
  
    //Listener for the week selection menu
    slack_app.action('week_button', async ({ body, ack, client }) => {
     // Acknowledge action request
        await ack();
        
        //Select the desired part of the "body"
        //where to insert the resulting data
        for (var i = 0; i < body.view.blocks.length; i++) {            
            if(body.view.blocks[i].block_id == "week-main") {
                
                //Deletes the button
                delete body.view.blocks[i].accessory;
                
                //Inserts data about the week
                body.view.blocks[i].text.text = "Current week: " + fn.getCurrentWeek(true);
            }
            
        }
        
        //Redrawing the main menu with the changes made
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
        }
        catch (error) {
            console.log(error);
        }
    
    });
  
    //Listener for the grades selection menu
    slack_app.action('grades_select', async ({ body, ack, client }) => {
        // Acknowledge action request
        await ack();
        
        //Takes the user-selected module                
        var selectedModule = body.view.state.values.grades_main.grades_select.selected_option.text.text;
        console.log(selectedModule);
        
        //Checks if all modules are selected
        //This determines how the data for the return will be generated
        if(selectedModule != "All modules") {
            
            //Select the desired part of the "body"
            //where to insert the resulting data
            for (var i = 0; i < body.view.blocks.length; i++) { 
                if (body.view.blocks[i].block_id == "grades_main") {
                    
                    //Checks whether the module exists
                    //in the "body" with the given ID
                    if(body.view.blocks[i+1].block_id != "grades_result") {
                        
                        //Save data after selected block
                        var divider = body.view.blocks[i+1];
                        
                        //Deletes data after the desired block
                        body.view.blocks.splice(i+1);
                        
                        //Inserts data after the selected block
                        body.view.blocks.push({"type": "section",
                                                "block_id": "grades_result",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Your grade for: \r" + selectedModule + " ---- " + fn.getMyGrades(selectedModule)
                                                }});
                        //Returns the previously deleted data
                        body.view.blocks.push(divider);
                    }
                    else {
                        //Inserts data into an existing block
                        var textRes = body.view.blocks[i+1].text.text;
                        body.view.blocks[i+1].text.text = textRes + "\r" + selectedModule + " ---- " + fn.getMyGrades(selectedModule);
                    }
                }           
            }
        }
        else {
            
            //Select the desired part of the "body"
            //where to insert the resulting data
            for (var i = 0; i < body.view.blocks.length; i++) { 
                if (body.view.blocks[i].block_id == "grades_main") {
                    
                    //Checks whether the module exists
                    //in the "body" with the given ID
                    if(body.view.blocks[i+1].block_id != "grades_result") {
                        
                        //Save data after selected block
                        var divider = body.view.blocks[i+1];
                        
                        //Deletes data after the desired block
                        body.view.blocks.splice(i+1);
                        
                        //Inserts data after the selected block
                        body.view.blocks.push({"type": "section",
                                                "block_id": "grades_result",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Your grade for: \r" + fn.getMyGrades("slashCommand")
                                                }});
                        
                        //Returns the previously deleted data
                        body.view.blocks.push(divider);
                    }
                    else {
                        //Inserts data into an existing block
                        var textRes = body.view.blocks[i+1].text.text;
                        body.view.blocks[i+1].text.text = textRes + "\r" + fn.getMyGrades("slashCommand");
                    }
                }           
            }
        }
        
        //Redrawing the main menu with the changes made
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
        }
        catch (error) {
            console.log(error);
        }
    });
    
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    function createNiceDateForVersion(thisDate) {
        return thisDate.getFullYear() + '-' + str_pad((thisDate.getMonth() + 1)) + '-' + str_pad(thisDate.getDate()) + ' ' + str_pad(thisDate.getHours()) + ':' + str_pad(thisDate.getMinutes())
    }

    function str_pad(theNumber) {
        return ('0' + theNumber).slice(-2)
    }
}
