// create a temporary http server
'use strict';
require('marko/node-require').install();

// browser-refresh module for marko
require('marko/browser-refresh').enable();

const express = require('express');

// Replaced by lasso/middleware")
// const serveStatic = require('serve-static');

const path = require('path');

require('lasso').configure({
    require: {
        transforms: [
            {
                transform: 'lasso-babel-transform',
                config: {
                    extensions: ['.js', '.es6'] // Enabled file extensions. Default: ['.js', '.es6']
                }
            }
        ]
    },
    plugins: [
        'lasso-less',
        'lasso-autoprefixer',
        'lasso-marko'
    ],
    'url-prefix': '/static',
    outputDir: 'static',
    fingerprintsEnabled: false,
    minify: false,
    bundlingEnabled: false,
    resolveCssUrls: true,
    cacheProfile: 'development'
});

const app = express();

// This is necessary for auto discovery the lasso static folder
app.use(require("lasso/middleware").serveStatic());

app.get('/', (req, res) => {
    res.writeHeader(200, {
        'Content-Type': 'text/html'
    });
    // load the renderer
    require('marko').load(require.resolve('./template.marko')).render({
        flag: parseInt(req.query.style) || 6
    }, res);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
    if (process.send) {
        process.send('online');
    }
});

module.exports = app;
