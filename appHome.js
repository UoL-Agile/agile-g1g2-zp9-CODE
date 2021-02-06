module.exports = function(slack_app) {

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
                            "text": {
                                "type": "plain_text",
                                "text": "Current Week",
                                "emoji": true
                            }
                        },
                        {
                            "type": "section",
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
  
    slack_app.action('week_button', async ({ body, ack, say }) => {
     // Acknowledge action request
     await ack();
     await say('Current week button clicked 👍');
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
