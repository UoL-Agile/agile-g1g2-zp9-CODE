// DB CONNECTION

/*
This uses the pool in order to have a single connection to the DB pooled for the app
*/
const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL); // Gets the DB URL from the process.env

const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: {
        rejectUnauthorized: false // this needs to be change in PROD
    }
};


exports.connectDB_Pool = function() {
    const pool = new Pool(config);
    global.db_pool = pool; // make the pool available to the app globally     
}