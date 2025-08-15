# Adding Custom Column to Item Tree

The item tree displays items in the Zotero library pane. By default, it includes columns for metadata like title, creator, and date. Plugins can add custom columns to display additional data.

<!-- TODO: update API -->

To add a custom column to the item tree, you can use the `Zotero.ItemTreeManager.registerColumn` method in the `startup` hook. The custom columns can be automatically unregistered when the plugin is unloaded.

For example, to add a custom column to display the reversed title of the item:

```javascript
const registeredDataKey = await Zotero.ItemTreeManager.registerColumn({
  dataKey: "rtitle",
  label: "Reversed Title",
  pluginID: "myplugin@mydomain.com", // Replace with your plugin ID
  dataProvider: (item, dataKey) => {
    return item.getField("title").split("").reverse().join("");
  },
});
```

To remove the custom column:

```javascript
await Zotero.ItemTreeManager.unregisterColumn(registeredDataKey);
```

Here is another example that uses all the available options of the `registerColumn` method:

```javascript
const registeredDataKey = await Zotero.ItemTreeManager.registerColumn({
  dataKey: "rtitle",
  label: "Reversed Title",
  enabledTreeIDs: ["main"], // only show in the main item tree
  sortReverse: true, // sort by increasing order
  flex: 0, // don't take up all available space
  width: 100, // assign fixed width in pixels
  fixedWidth: true, // don't allow the user to resize
  staticWidth: true, // don't allow the column to be resized when the tree is resized
  minWidth: 50, // minimum width in pixels
  iconPath: "chrome://zotero/skin/tick.png", // icon to show in the column header
  htmlLabel: '<span style="color: red;">reversed title</span>', // use HTML in the label. This will override the label and iconPath property
  showInColumnPicker: true, // show in the column picker
  columnPickerSubMenu: true, // show in the column picker submenu
  pluginID: "myplugin@mydomain.com", // plugin ID, which will be used to unregister the column when the plugin is unloaded
  dataProvider: (item, dataKey) => {
    // item: the current item in the row
    // dataKey: the dataKey of the column
    // return: the data to display in the column
    return item.getField("title").split("").reverse().join("");
  },
  renderCell: (index, data, column) => {
    // index: the index of the row
    // data: the data to display in the column, return of `dataProvider`
    // column: the column options
    // return: the HTML to display in the cell
    const cell = document.createElement("span");
    cell.className = `cell ${column.className}`;
    cell.textContent = data;
    cell.style.color = "red";
    return cell;
  },
  zoteroPersist: ["width", "hidden", "sortDirection"], // persist the column properties
});
```

For more information about the API, refer to the [source code](https://github.com/zotero/zotero/blob/main/chrome/content/zotero/xpcom/pluginAPI/itemTreeManager.js).
