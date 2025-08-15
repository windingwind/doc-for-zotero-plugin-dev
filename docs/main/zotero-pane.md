# Interacting with ZoteroPane

The code below shows how to interact with the Zotero pane to get the currently selected items.

```javascript
const ZoteroPane = Zotero.getActiveZoteroPane();
```

Then grab the currently selected items from the Zotero pane:

```javascript
// Get first selected item
const selectedItems = ZoteroPane.getSelectedItems();
const item = selectedItems[0];
// Proceed if an item is selected and it isn't a note
if (item && !item.isNote()) {
  if (item.isAttachment()) {
    // find out about attachment
  }
  if (item.isRegularItem()) {
    // We could grab attachments:
    // let attachmentIDs = item.getAttachments();
    // let attachment = Zotero.Items.get(attachmentIDs[0]);
  }
  alert(item.id);
}
```
