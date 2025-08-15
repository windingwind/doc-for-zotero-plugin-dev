# Injecting to Reader UI

The reader interface in Zotero is inside an iframe. This means that directly injecting elements into the reader UI is not possible. Plugins can add custom elements to the reader UI using the `Zotero.Reader.registerEventListener` method in the `startup` function. The event listener you register will automatically be removed when the plugin is unloaded.

For example, plugins can add an element to display the translation of the selected text in the reader's text selection popup:

```javascript
Zotero.Reader.registerEventListener(
  "renderTextSelectionPopup",
  (event) => {
    const { reader, doc, params, append } = event;
    // Create a custom element to display the translated text
    const container = doc.createElement("div");
    container.append("Loading…");
    // Append the custom element to the text selection popup
    append(container);
    // Use a timeout to simulate an asynchronous operation
    setTimeout(
      () =>
        container.replaceChildren(`Translated text: ${params.annotation.text}`),
      1000,
    );
  },
  "myplugin@mydomain.com", // Replace with your plugin ID
);
```

The following injecting UI types are supported for the `registerEventListener` method:

- `renderTextSelectionPopup`: triggered when the selection popup is rendered
- `renderSidebarAnnotationHeader`: triggered when the left sidebar's annotation header line is rendered
- `renderToolbar`: triggered when the reader's top toolbar is rendered

For more information about the API, refer to the [source code](https://github.com/zotero/blob/main/chrome/content/zotero/xpcom/reader.js).
