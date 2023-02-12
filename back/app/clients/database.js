// const { Client } = require('pg');

// const client = new Client(process.env.PGURL);

// client.connect();


//! Tentative connection BDD avec knex
require('dotenv').config();

const knex = require('knex')

const client = new knex({
    client: 'pg',
    connection: {
        connectionString:process.env.PGURL,
        ssl: { rejectUnauthorized: false }
    } ,

});

// const knexClient = require('knex')({
//     client: 'pg',
//     connection: {
//         host : '127.0.0.1',
//         port : 5432,
//         user : 'animoprotect',
//         password : 'lapsicine',
//         database : 'animo'
//     }
// });


module.exports = client;
