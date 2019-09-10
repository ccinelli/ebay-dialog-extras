'use strict';
require('marko/node-require').install();
const tryRequire = require('try-require');
const promisify = require('util').promisify;
const chaiJestSnapshot = require('chai-jest-snapshot');
const chai = require('chai');
const beautify = require('js-beautify');
const _merge = require('lodash.merge');
const appProto = tryRequire('express/lib/application');
const fs = require('fs');
const jQuery = fs.readFileSync(require.resolve('jquery'), 'utf-8');
let isServerStarted;
let appProtoListen;
let servers = [];



const prettyDefaults = {
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    sep: '\n'
};

function pretty(str, options) {
    var opts = Object.assign({}, prettyDefaults, options);
    return beautify.html(str, opts);
}

// Used in getSnapshot to strip the "data-widget" attribute
const stripDataWidgetRegEx = /\s?data\-widget\s*\=\s*["'][^"']*["']/gi;

// place all default script executables inside this array

// try require these modules
const jsdom = tryRequire('jsdom');
const supertest = tryRequire('supertest');

let isSnapshotsEnabled = false;

module.exports = {

    /**
     * Regarding snapshot testing:
     *
     * You can read more here: https://jestjs.io/docs/en/snapshot-testing
     *
     * Once you ARE SURE the changes in the snapshot are wanted and expected, you can run:
     * `yarn fix-snapshots` or  `CHAI_JEST_SNAPSHOT_UPDATE_ALL=true grunt mochaTest:test`
     *
     */

    // Enable Jest-like snapshot tests
    enableSnapshots: function() {
        if (isSnapshotsEnabled) return;

        chai.use(chaiJestSnapshot);
        before(() => {
            chaiJestSnapshot.resetSnapshotRegistry();
        });
        beforeEach(function() {
            chaiJestSnapshot.configureUsingMochaContext(this);
        });

        isSnapshotsEnabled = true;
    },

    // Provide HTML snapshot
    getSnapshot: function(widget, data) {
        const widgetRender = promisify(widget.render);
        // Pretty makes it easy to see the differences in snap file
        return widgetRender(data).then((out) => {
            // We need to strip the 'data-widget' that looks like: data-widget="/boltutils$3.3.17/lib/ui-modules/accordion/index"
            // or every time we increase the version the snapshot will break
            const html = out.html.replace(stripDataWidgetRegEx, '');

            return pretty(html);
        });
    },

    // Render a Marko component and check the response against the snapshot
    testSnapshot: function(widget, widgetData, done) {
        if (widgetData) {
            if (!widgetData.$global) {
                widgetData.$global = {};
            }
        }
        this.getSnapshot(widget, widgetData).then((html) => chai.expect(html).to.matchSnapshot())
            .then(() => done())
            .catch((err) => done(err));
    },

    // Snapshot testing for JSON objects
    testSnapshotJson: function(data, _opt) {
        const opt = Object.assign(inspectDefaults, _opt);
        const tree = util.inspect(data, opt);

        chai.expect(tree).to.matchSnapshot();
    },

    // Copy and patch mock data
    mergeMock: (data, patch) => _merge({}, data, patch),

    /* Pass the template, templateData, comma separated array of script URL's to run in the env */
    async createWidget(widgetDef, widgetData) {
        if (!jsdom) {
            throw new Error('no JSDOM found');
        }
        // merge the default Array of scripts with the one sent by the caller
        const html = await promisify(widgetDef.render.bind(widgetDef))(widgetData);

        const window = new jsdom.JSDOM(`
            <html>
                <head>
                    <script>
                        ${jQuery}
                    </script>
                </head>
                <body>
                    ${html}
                </body>
            </html>
        `, { runScripts: 'dangerously' }).window;
        return {
            $: (arg) => {
                if (arg) {
                    return window.$('body > *').find(arg);
                }
                return window.$('body > *');
            }
        };
    },
    getApp: function(cb) {
        if (!supertest) {
            return Promise.reject(new Error('no supertest'));
        }
        return this.isServerStarted.then(app => new Promise((resolve, reject) => {
            cb.call(supertest(app)).end((error, value) => {
                if (error) {
                    reject(error);
                } else if (arguments.length > 2) {
                    resolve(Array.prototype.slice(arguments, 1));
                } else {
                    resolve(value);
                }
            });
        }));
    },
    stopServer: function() {
        // we shutdown all open Servers and restore the `app.listen` spy
        servers.forEach((server) => {
            try {
                server.close();
            } catch (e) {
                // do nothing here
            }
        });
        servers = [];
        if (appProto) {
            appProto.listen = appProtoListen;
        }
    },
    get isServerStarted() {
        // if the server is not already started, we start the server here
        if (!isServerStarted) {
            // spy on app.listen to get the number of servers created. This list is used later to shutdown the servers
            if (appProto) {
                appProtoListen = appProto.listen;
                appProto.listen = () => {
                    const server = appProtoListen.apply(this, arguments);
                    servers.push(server);
                    return server;
                };
            }
            isServerStarted = new Promise(resolve => {
                const applicationPath = 'index.js';
                // set the node environment to test so that test configurations load
                process.env.NODE_ENV = 'test';
                const app = require(applicationPath);
                app.on('start', () => resolve(app));
            });
        }
        return isServerStarted;
    }
}
;
