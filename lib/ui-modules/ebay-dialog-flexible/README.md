# ebay-dialog-flexible

```marko
<ebay-dialog-flexible open a11y-close-text="Close Dialog">
  <h1>Hello World</h1>
</ebay-dialog-flexible>
```

## Attributes
Name | Type | Stateful | Description
--- | --- | --- | ---
`type` | String | No | Can be "full" / "fill" / "left" / "right".
`open` | Boolean | Yes | Whether dialog is open.
`focus` | String | No | An id for an element which will receive focus when the dialog opens (defaults to close button).
`a11y-close-text` | String | No | A11y text for close button and mask.
`focus-if-visible` | String | No | focus on the element if it is in the viewport on open (ex: '#my-ok-button')
`full-max-width` | String | No | Default "600px" breaking point when the dialog become full screen. You should not have to touch this unless you want full screen on tablet. Then you want 768px. It accept a full media query. Useful in case you need something custom (Because maybe you did some naughty like fixing the `dialog__window`. See the **note below** and [the window.matchMedia documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).  

## Events
Event | Data | Description
--- | --- | ---
`dialog-show` |  | dialog opened
`dialog-close` |  | dialog closed

## Note

### Fixed width
If you have to fix the width, make sure your designer understand what he is doing.  The goal of eBayUI is not only to speed up development but also **to keep the UI on the site consistent**. The ebay site should have consistent dialogs.

That said, if you *really* have to, the cleanest way is adding this CSS:

```css
.dialog.my-unique-class .dialog__window:not(.dialog__window--full) {
    width: 800px;
    max-width: 800px;
    min-width: 800px;
}
```

And use `<ebay-dialog-flexible class="my-unique-class" ...>`.

This will keep the dialog responsive. You should not have to use the `full-max-width` property. But it is there in case you really need it.

#### Current media queries on the `ebay-dialog` related with `width`

For reference: at the moment (`skin@9.1.0`) the media queries are:

```css
.dialog__window {
    max-width: 616px;
    width: calc(100% - 32px);
}

@media (max-width: 1024px) and (min-width: 769px) {
  .dialog__window:not(.dialog__window--full) {
      width: calc(75% - 32px);
      max-width: 616px;
  }
}

@media (max-width: 768px) and (min-width: 601px) {
  .dialog__window:not(.dialog__window--full) {
      width: calc(88% - 32px);
      min-width: calc(88% - 32px);
      max-width: calc(88% - 32px);
  }
}
```

### Fixed height
Another variation that we saw is fixed height with content that scroll in the window. This variation may also have fixed footer and potentially header too. This is _really really_ discouraged. Please try to avoid this stuff. 

There is a reason why the full dialog window is scrolling:

**These kind of dialogs are not accessible and usually raise accessibility bugs**. 

If you really have to, please add a container like a <div> with `height: your_magic_height px` in the body of the dialog. 
You do **not need** to monkey patch any CSS of a component that you not control.

Creating a dialog with variable height and sticky footer takes more work. But we are going to give an example of how to do it t the moment.

Again, scrollable content in a dialog creates **problems for accessibility**.

