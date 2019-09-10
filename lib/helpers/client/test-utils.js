'use strict';
/* globals document, window */
// add shims
require('@babel/polyfill');
window.global = window;

module.exports = {
    createWidget: function(widgetDef, data, el) {
        const widget = widgetDef.renderSync(data).appendTo(el).getWidget();
        return new Promise(resolve => resolve(widget));
    },
    clickElement: function(el) {
        const ev = document.createEvent('MouseEvent');
        ev.initMouseEvent(
            'click',
            // bubble
            true,
            // cancelable
            true,
            window,
            null,
            // coordinates
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            //  modifier keys
            false,
            0,
            null
        );
        if (!el instanceof jQuery) {
            el = $(el);
        }
        el.get(0).dispatchEvent(ev);
        return this.delay(100);
    },
    delay: function(millis) {
        millis = millis || 0;
        return new Promise(resolve => {
            window.setTimeout(resolve, millis);
        });
    }
};
