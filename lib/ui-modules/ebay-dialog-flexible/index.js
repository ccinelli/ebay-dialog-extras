const markoWidgets = require('marko-widgets');


var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

module.exports = markoWidgets.defineComponent({
    template: require('./template.marko'),

    getInitialState: function (input) {
        const { type, open, focus, a11yCloseText, style, focusIfVisible } = input;
        const state = {
            "class": input.class,
            originalType: type,
            type: type === 'flexible' || type === undefined ? typeof(window) !== 'undefined' && (window.matchMedia('(max-width: 600px)').matches ? 'full' : '') : type,
            fullMaxWidth: "600px",   // Breaking point where the dialog become "Full", 600 should be right. Unless you want full screen on tablet. Then you want 768px
            open,
            a11yCloseText,
            focus,
            style,
            focusIfVisible
        };

        return state;
    },

    init: function () {
        this.createMatcher();
    },

    createMatcher: function () {
        if (this.state.originalType === undefined || this.state.originalType === 'flexible') {
            this.cancelMatcher();

            let breakingWidthQuery;

            // Let the user specify their own full queries. The fullMaxWidth needs then to start with "("
            if (this.state.fullMaxWidth[0] === '(') {
                breakingWidthQuery = this.state.fullMaxWidth;
            } else {
                breakingWidthQuery = `(max-width: ${this.state.fullMaxWidth})` ;
            }
            const match = window.matchMedia(breakingWidthQuery);
            
            const handleMediaChange = () => {
                const type = match.matches ? 'full' : ''
                this.setState('type', type);
            }
            handleMediaChange();
            match.addListener(handleMediaChange);   
            this.cancelMatcherFn = match.removeListener.bind(match, handleMediaChange);
        }    
    },

    cancelMatcher: function () {
        if(this.cancelMatcherFn) {
            this.cancelMatcherFn();
            this.cancelMatcherFn = null;
        }
    },

    handleShow: function () {
        this.emit('dialog-open');
        if (this.state.focusIfVisible) {
            const selector = this.state.focusIfVisible;
            const elementToFocusOn = this.el.querySelector(selector);
            setTimeout(() => {
                console.log('elementToFocusOn', elementToFocusOn);
                if(elementToFocusOn && isInViewport(elementToFocusOn)) elementToFocusOn.focus();
            }, 0);
        }
    },

    handleClose: function () {
        this.emit('dialog-close');
    },

    onBeforeDestroy: function () {
        this.cancelMatcher();
    }
});
