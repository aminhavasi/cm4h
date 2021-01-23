const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { db } = require('./src/db/mongo');
require('dotenv').config({
    path: './config/config.env',
});

db();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const httpLogger = rfs.createStream('access.log', {
    path: path.resolve(__dirname + '/src/logs'),
    interval: '1d',
    size: '1G',
    compress: 'gzip',
});

app.use(morgan('combined', { stream: httpLogger }));

app.use(async (err, req, res, next) => {
    try {
        if (err) return res.status(500).send('web error');
        next();
    } catch (err) {
        res.status(400).send('ops!');
    }
});
app.use('/api/auth', require('./src/routes/auth'));
app.use(async (req, res) => {
    res.status(404).send('the request is incorrect!');
});
const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`servr is running on port ${port}`);
    }
});
