const testUtils = require('../../../helpers/server/test-utils');
const component = require('../');

testUtils.enableSnapshots();

// tests mirrored from eBayUI 

describe('ebay-dialog-footer', () => {
    it('renders basic version', done => {
        testUtils.testSnapshot(component, {
        }, done);
    });
});
