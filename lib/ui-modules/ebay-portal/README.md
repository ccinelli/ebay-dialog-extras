# A Portal Component for Marko.js

### Note
Waiting for `@marko-tags/portal`. This is the PR to be merged: https://github.com/marko-js/tags/pull/13

# Intro

Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

A typical use case for portals is when a parent component has an `overflow: hidden`, `will-change: transform` or `z-index` style, but you need the child to visually “break out” of its container. For example, dialogs and tooltips.

# Example

By default, the portal renders into `document.body`:

```marko
<ebay-portal>
   ...content here...
</ebay-portal>
```

You can set a custom target container using a DOM id:

```marko
<ebay-portal target="some-id">
   ...content here...
</ebay-portal>
```

Or by passing a DOM Node:

```marko
<ebay-portal target=someNode>
   ...content here...
</ebay-portal>
```
