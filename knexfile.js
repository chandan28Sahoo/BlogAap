// Update with your config settings.
const Dotenv = require("dotenv");
Dotenv.config({ path: `${__dirname}/.env` });
const { Db_NAME, DB_USER, DB_PASS, SECRET_KEY } = process.env;
module.exports = {
    development: {
        client: "pg",
        connection: "pg://postgres:chandan19@localhost:5000/blog",
        migrations: {
            directory: __dirname + "/knex/migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};