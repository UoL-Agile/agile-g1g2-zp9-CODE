const slack_app = require('./index');

const homeView = async(user) => {

	let blocks = [

		/* Intro message */
		{
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
				"text": "This is a home for the Prototype application. Here you can check your university course progress."
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
					"text": "Display deadlines",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "button-action"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "datepicker",
					"initial_date": "2021-01-01",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					},
					"action_id": "actionId-0"
				},
				{
					"type": "datepicker",
					"initial_date": "2021-01-01",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					},
					"action_id": "actionId-1"
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
					"text": "Display current week",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "button-action"
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
				"options": [
					{
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
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Display grades",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-0"
				}
			]
		},
		{
			"type": "divider"
		}
	];

	let view = {
		type: 'home',
		callback_id: 'home_view',
		title: {
			type: 'plain_text',
			text: 'Keep track of course progress!'
		},
		blocks: blocks
	}

	return JSON.stringify(view);
};


/* Display App Home */

const displayHome = async(user) => {
	return await homeView(user);
};
