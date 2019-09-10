const testUtils = require('../../../helpers/server/test-utils');
const component = require('../');

// tests mirrored from eBayUI 

describe.skip('dialog', () => {
    it('renders basic version', done => {
        testUtils.testSnapshot(component, {
        }, done);
    });
    it('renders with a renderBody', done => {
        testUtils.testSnapshot(component, {
            renderBody: out => out.write('Hello World') 
        }, done);
    });
    it('renders with a11y close text', done => {
        testUtils.testSnapshot(component, {
            a11yCloseText: 'Close Dialog' 
        }, done);
    });
    it('renders in open state', done => {
        testUtils.testSnapshot(component, {
            open: true 
        }, done);
    });
    [undefined, 'flexible', 'full'].forEach(type => {
        it(`renders with ${type || 'default'} type`, done => {
            const input = { type: type };
            testUtils.testSnapshot(component, input, done);
        });
    });
});
