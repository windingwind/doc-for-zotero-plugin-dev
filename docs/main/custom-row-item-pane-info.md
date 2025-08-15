# Adding Custom Row to Item Pane Info Section

The item pane info section displays item metadata (fields). Plugins can add custom rows to show additional fields.

To add a custom row, use `Zotero.ItemPaneManager.registerInfoRow` in your plugin's `startup` hook. The custom sections can be automatically unregistered when the plugin is unloaded.

```javascript
const registeredID = Zotero.ItemPaneManager.registerInfoRow({
  rowID: "custom-info-row-example",
  pluginID: "example@example.com",
  label: {
    l10nID: "general-print",
  },
  position: "afterCreators",
  multiline: false,
  nowrap: false,
  editable: true,
  onGetData({ rowID, item, tabType, editable }) {
    return item.getField("title").split("").reverse().join("");
  },
  onSetData({ rowID, item, tabType, editable, value }) {
    Zotero.debug(`Set custom info row ${rowID} of item ${item.id} to ${value}`);
  },
});
```

To unregister the custom section:

```javascript
Zotero.ItemPaneManager.unregisterInfoRow(registeredID);
```

For more advanced options, refer to the [source code](https://github.com/zotero/zotero/blob/main/chrome/content/zotero/xpcom/pluginAPI/itemPaneManager.js).
