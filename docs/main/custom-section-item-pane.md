# Adding Custom Section to Item Pane

The item pane displays detailed information about selected items in Zotero. Plugins can add custom sections to show additional data.

To add a custom section, use `Zotero.ItemPaneManager.registerSection` in your plugin's `startup` hook. The custom sections can be automatically unregistered when the plugin is unloaded.

```javascript
const registeredID = Zotero.ItemPaneManager.registerSection({
  paneID: "custom-section-example",
  pluginID: "example@example.com",
  header: {
    l10nID: "example-item-pane-header",
    icon: `${rootURI}icons/16/universal/book.svg`,
  },
  sidenav: {
    l10nID: "example-item-pane-header",
    icon: `${rootURI}icons/20/universal/book.svg`,
  },
  onRender: ({ body, item, editable, tabType }) => {
    body.textContent = JSON.stringify({
      id: item?.id,
      editable,
      tabType,
    });
  },
});
```

To unregister the custom section:

```javascript
Zotero.ItemPaneManager.unregisterSection(registeredID);
```

For more advanced options, refer to the [source code](https://github.com/zotero/zotero/blob/main/chrome/content/zotero/xpcom/pluginAPI/itemPaneManager.js).

Explanations of the hooks of the item pane section:

- `onInit`: Called when the section is initialized and attached to the DOM. You can set up notifier observers here. The UI is not rendered yet, so you should not update the UI.
- `onItemChange`: Called when the target item changes. This is useful for enabling/disabling the section based on the item. If the section is not enabled, the section will not be rendered. You should not update the UI.
- `onRender`: Called when the section is rendered. This is where you should update the content of the section. This must be a synchronous function. For tasks that might block the main thread, use `onAsyncRender`.
- `onAsyncRender`: Called when the section is rendered asynchronously. This is useful for fetching data from the server or other asynchronous tasks.
- `onToggle`: Called when the section is toggled. You can use this hook to refresh the content of the section when it is shown.
- `onDestroy`: Called when the section is destroyed. You should clean up any resources here, such as removing observers.

Only `onInit` and `onDestroy` will always be called. The other hooks will be called when Zotero thinks it is necessary. For example, `onItemChange` will be called when the item changes, but that does not mean the section will be rendered, and `onRender` might not be called. Also, calling `onRender` does not guarantee that the `onAsyncRender` will be called.
