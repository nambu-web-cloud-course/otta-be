const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const development = {
	username: env.MYSQL_DEV_USERNAME,
	password: env.MYSQL_DEV_PASSWORD,
	database: env.MYSQL_DEV_DATABASE,
	host: env.MYSQL_DEV_HOST,
	port: 3306,
	dialect: 'mysql',
};

const test = {
	username: env.MYSQL_TEST_USERNAME,
	password: env.MYSQL_TEST_PASSWORD,
	database: env.MYSQL_TEST_DATABASE,
	host: env.MYSQL_TEST_HOST,
	port: 3306,
	dialect: 'mysql',
};

const production = {
	username: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE,
	host: env.MYSQL_HOST,
	port: 3306,
	dialect: 'mysql',
};

module.exports = { development, test, production };
