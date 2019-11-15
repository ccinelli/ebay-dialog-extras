# `ebay-dialog-flexible`, `ebay-dialog-footer` and `ebay-portal`

### Note 

`v2.0.0` and above require MarkoJs `v4` or above. For a version compatible with MarkoJs `v3` use `v1.0.0`.

## Intro

You usually want to have a smaller dialog on a larger screen and a full screen dialog on mobile. That would be easily done in CSS but unfortunately skin does not have that class. 

`ebay-dialog-flexible` wraps a eBayUI dialog so it can be responsively change between desktop and mobile without overriding CSS or other practices that violates the separation of concerns (SoC) principle.

`ebay-dialog-footer` create a footer where the buttons dynamically adapt in mobile or desktop view.


### Responsibility 

See also [the notes](#notes) below.

`ebay-dialog-flexible` responsibility is to render a dialog that responsively adapts (changing its type) to `full` only on mobile. It wraps `ebay-dialog` in a non invasive way.
It also take care of focusing on a element only if it is in the viewport otherwise the dialog would scroll to the bottom ( using the `focus-if-visible` prop).

`ebay-dialog-footer` responsibility is to render a footer in a dialog. When it has the `has-action-buttons` prop and contain elements with class `..ebay-ebay-dialog-flexible--actions` (like `ebay-buttons`), it renders the elements aligned on the right in a "normal" `ebay-dialog` and stacked on a `full` dialog.

## Run demo locally 

```
git clone https://github.com/ccinelli/ebay-dialog-extras
cd ebay-dialog-extras
yarn
yarn start
```

## UI Components
For more detail check: 

 - [ebay-dialog-flexible](./lib/ui-modules/ebay-dialog-flexible/README.md)
 - [ebay-dialog-footer](./lib/ui-modules/ebay-dialog-footer/README.md)
 - [ebay-portal](./lib/ui-modules/ebay-portal/README.md)


## Notes

This code is written keeping in mind the [separation of concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns) and the [encapsulaion](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) principles. 

A component should be responsible to manage its own internal representation of the state, how it renders (HTML and CSS). 

A component should not monkey patch the state of another component or override its CSS. The shortcuts could be faster but it will come back to hunt you with bugs and make people that care about their crafts very upset ;-).  


## History

The components have been extracted from [`boltutils`](https://github.corp.ebay.com/c2cselling/boltutils/tree/b6a9a38b54af0af697701d2a2c64f85b44c13e7e/lib/ui-modules) and adapted to the latest version of [eBayUI](https://github.com/eBay/ebayui-core).

# Know problems

- `ebay-dialog-footer` has an ugly gray thick border on DS4. This cannot be undone without monkey patching the CSS of the `ebay-dialog` 