module.exports = require('marko-widgets').defineComponent({
    template: require.resolve('./template.marko'),
    getInitialState: function(input) {
        input = input || {};
        input.modalOpen = false;
        input.modalBasic = false;
        input.modalFull = false;
        input.modalFullOnMobile = false;
        input.modalWithFooter = false;
        input.modalWithFooterLong = false
        return input;
    },
    handleClose: function() {
        this.setState('modalOpen', false);
        this.setState('modalBasic', false);
        this.setState('modalFull', false);
        this.setState('modalFullOnMobile', false);
        this.setState('modalWithFooter', false);
        this.setState('modalWithFooterLong', false);
    },
    openModal: function() {
        this.setState('modalOpen', true);
    },
    openEbayDialogBasic: function() {
        this.setState('modalBasic', true);
    },
    openEbayDialogBasicFull: function() {
        this.setState('modalFull', true);
    },
    openEbayDialogBasicFullOnMobile: function() {
        this.setState('modalFullOnMobile', true);
    },

    // This is the dialog with the footer
    openEbayDialogWithFooter: function() {
        this.setState('modalWithFooter', true);
    },

    // This is the dialog with the footer
    openEbayDialogWithFooterLong: function() {
        this.setState('modalWithFooterLong', true);
    },
    
    footerMaxWidthChange: function(ev, el) {
        const value = $(el).val();

        switch (value) {
            case 'fixed':
                this.setState('dialogMaxWidth', true);
                break;
            default:
                this.setState('dialogMaxWidth', false);
        }
    },
    footerNoActionTextWrap: function(ev, el) {
        const value = $(el).val();

        switch (value) {
            case 'nowrap':
                this.setState('noActionTextWrap', true);
                break;
            default:
                this.setState('noActionTextWrap', false);
        }
    },
    footerbuttonSizeChange: function(ev, el) {
        const value = $(el).val();

        switch (value) {
            case 'big':
                this.setState('dialogFooter', {ok: 'Ok, this is going to work!', cancel: 'Let\'s close this thing, pal!'});
                break;
            default:
                this.setState('dialogFooter', undefined);
        }
    },
    ok: function() {
        alert('You pushed ok');
        this.handleClose();
    },
    cancel: function() {
        alert('You pushed cancel. You still have to call the function to close the dialog =P See this.ok in this file');
    }    
});
