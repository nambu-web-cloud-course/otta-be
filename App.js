const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const sync = require('./models/sync.js');
sync();

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port);
