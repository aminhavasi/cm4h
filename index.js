const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
require('dotenv').config({
    path: './config/config.env',
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`servr is running on port ${port}`);
    }
});

//salam
