const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const sync = require('./models/sync.js');
sync();

const port = process.env.PORT || 3000;
const app = express();

const find_clothing_box_router = require('./routes/find_clothing_box_router.js');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/find-clothing-box', find_clothing_box_router);

app.listen(port);
