const markoWidgets = require('marko-widgets');
const template = require('./template.marko');

module.exports = markoWidgets.defineComponent({
    template: require('./template.marko'),
    getInitialState: function (input) {
        const { hasActionButtons } = input;
        return {
            class: input.class,
            hasActionButtons
        };
    }
});
