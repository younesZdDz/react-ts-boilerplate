/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
const compression = require('compression');
const logger = require('./logger');
require('dotenv').config();

const app = express();

const publicPath = '/';
const outputPath = path.resolve(process.cwd(), 'build');

// compression middleware compresses your server responses which makes them
// smaller (applies also to assets). You can read more about that technique
// and other good practices on official Express.js docs http://mxs.is/googmy
app.use(compression());
app.use(publicPath, express.static(outputPath));

app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host

const customPort = process.env.PORT;
const port = customPort || null;
// use the gzipped bundle
app.get('*.js', (req, res, next) => {
	req.url = req.url + '.gz'; // eslint-disable-line
    res.set('Content-Encoding', 'gzip');
    next();
});

// Start your app.
app.listen(port, host, async (err) => {
    if (err) {
        return logger.error(err.message);
    }
    logger.appStarted(port, host);
});
