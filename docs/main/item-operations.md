# Item Operations

## Creating Items

A typical operation might include a call to `Zotero.Items.get()` to retrieve a `Zotero.Item` instance, calls to `Zotero.Item` methods on the retrieved object to modify data, and finally a `save()` (within a transaction) or `saveTx()` (outside a transaction) to save the modified data to the database.

```javascript
const item = new Zotero.Item("book");
item.setField("title", "Much Ado About Nothing");
item.setCreators([
  {
    firstName: "William",
    lastName: "Shakespeare",
    creatorType: "author",
  },
]);
const itemID = await item.saveTx();
```

```javascript
// Fetch saved items with Items.get(itemID)
const item = Zotero.Items.get(itemID);
Zotero.debug(item.getField("title")); // "Much Ado About Nothing"
Zotero.debug(item.getCreator(0)); // {'firstName'=>'William', 'lastName'=>'Shakespeare',
//   'creatorTypeID'=>1, 'fieldMode'=>0}
// Alternative format
Zotero.debug(item.getCreatorJSON(0)); // {'firstName'=>'William', 'lastName'=>'Shakespeare',
//   'creatorType'=>'author'}
item.setField("place", "England");
item.setField("date", 1599);
await item.saveTx(); // update database with new data
```

## Getting Item Data

Different item (specifically, regular item) types have different fields. To get the value of a field, use the `getField()` method. For example, to get an item's abstract, we get the `abstractNote` field from the Zotero item:

```javascript
const abstract = item.getField("abstractNote");
```

> 🔗 For more details about item fields, see [item_types_and_fields](https://www.zotero.org/support/kb/item_types_and_fields).

## Child notes

To get the child notes for an item, we use the following code:

```javascript
const noteIDs = item.getNotes();
```

This returns an array of ids of note items. To get each note in turn we just iterate through the array:

```javascript
for (const id of noteIDs) {
  const note = Zotero.Items.get(id);
  const noteHTML = note.getNote();
}
```

## Related Items

let relatedItems = item.relatedItems;

**Set two items as related to each other**

Given two items `itemA` and `itemB`. We can set them as related items to each other by using the `addRelatedItem` function:

```javascript
itemA.addRelatedItem(itemB);
await itemA.saveTx();
itemB.addRelatedItem(itemA);
await itemB.saveTx();
```

## Attachments full text

The code below gets the full text of HTML and PDF items in storage and put the data in an array:

```javascript
const item = ZoteroPane.getSelectedItems()[0];
const fulltext = [];
if (item.isRegularItem()) {
  // not an attachment already
  const attachmentIDs = item.getAttachments();
  for (const id of attachmentIDs) {
    const attachment = Zotero.Items.get(id);
    if (attachment.isPDFAttachment() || attachment.isSnapshotAttachment()) {
      fulltext.push(await attachment.attachmentText);
    }
  }
}
```
