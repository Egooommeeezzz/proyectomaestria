const { Pool } = require('pg');
const pool = new Pool({
    users: '',
    localhost: '',
    databasee: '',
    password: '',
    port: '5432',
});
module.exports = pool;