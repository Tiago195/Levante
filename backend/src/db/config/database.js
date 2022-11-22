require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASSWORD ?? null,
    "database": process.env.DATABASE ?? "database_development",
    "host": process.env.HOST ?? "127.0.0.1",
    "port": process.env.DB_PORT ?? "3306",
    "dialect": "mysql"
  }
}
