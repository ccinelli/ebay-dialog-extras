const testUtils = require('../../../helpers/server/test-utils');
const component = require('../');

testUtils.enableSnapshots();

// tests mirrored from eBayUI 

describe('ebay-dialog-flexible', () => {
    it('renders basic version', done => {
        testUtils.testSnapshot(component, {
            dontUsePortal: true,
        }, done);
    });
    it('renders with a renderBody', done => {
        testUtils.testSnapshot(component, {
            dontUsePortal: true,
            renderBody: out => out.write('Hello World') 
        }, done);
    });
    it('renders with a11y close text', done => {
        testUtils.testSnapshot(component, {
            dontUsePortal: true,
            a11yCloseText: 'Close Dialog' 
        }, done);
    });
    it('renders in open state', done => {
        testUtils.testSnapshot(component, {
            dontUsePortal: true,
            open: true 
        }, done);
    });
    [undefined, 'flexible', 'full'].forEach(type => {
        it(`renders with ${type || 'default'} type`, done => {
            const input = { type: type, dontUsePortal: true };
            testUtils.testSnapshot(component, input, done);
        });
    });
    it('renders with portal', done => {
        testUtils.testSnapshot(component, {
        }, done);
    });
});
