const slack_app = require('./index');

const homeView = async(user) => {
  // Intro message:
  
  let intro = [
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
		}
  ];
  
  let view = {
    type: 'home',
    callback_id: 'home_view',
    title: {
      type: 'plain_text',
      text: 'Keep track of course progress!'
    },
    blocks: intro
  }  
  
  return JSON.stringify(view);
};


/* Display App Home */

const displayHome = async(user) => {
  return await homeView(user);
};
