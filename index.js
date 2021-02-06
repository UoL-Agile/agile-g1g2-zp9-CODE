// ==== BOLT APP  AND EXPRESS RECEIVER ===========
// Require the Bolt package (github.com/slackapi/bolt)
const {
    App,
    ExpressReceiver,
    LogLevel
} = require("@slack/bolt");

// need this incase we are running locally (this it NOT secure but is needed for testing) - we could regenerate keys when we are live
if (process.env.SLACK_SIGNING_SECRET) {
    var SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET
} else {
    var SLACK_SIGNING_SECRET = 'c915abbf614385af3d9f974b7823a4ee'
}

if (process.env.SLACK_BOT_TOKEN) {
    var SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
} else {
    var SLACK_BOT_TOKEN = 'BWdYU5yCn4gu2ImxC8RLnoUA'
}
// End dangerous showing of tokens!

// Create a Bolt Receiver
const receiver = new ExpressReceiver({
    signingSecret: SLACK_SIGNING_SECRET
});

// Create the Bolt App, using the receiver
const slack_app = new App({
    receiver,
    token: SLACK_BOT_TOKEN,
    logLevel: LogLevel.DEBUG, // we want full details logged to the console for testings
    developerMode: true // we want full details logged to the console for testings
});

// for express route
//app = receiver.app;

//============= Slack app event listener====
require('./slashCommands')(slack_app)

// Import the app home file
require('./appHome')(slack_app)


// load the DB module
var db_conn = require('./dbConnection.js');
db_conn.connectDB_Pool(); // open a DB pool for us to use


//DB call

// EXAMPLE SQL - 'SELECT * FROM this_table'
function makeaDBCallWithSQL(theSQL) {
    db_pool.connect((err, client, release) => {
        if (err) {
            console.log('Error acquiring client', err)
            return callback(err)
        }
        client.query(theSQL, (err, result) => {
            release()
            if (err) {
                console.log('Error withe SQL Query', err)
                return callback(err)
            }

            return callback(null, JSON.stringify(result.rows))
        })
    })
}

//===============PORT and SERVER =================
var port = process.env.PORT || 3000; // need to get the port that Heroku gives us
/*app.listen(port);
console.log('index.js','listening on ' + port + '!');*/

(async () => {
    // Start your app
    await slack_app.start(port);

    console.log("⚡️ Bolt app is running on " + +port + '!');
})();
