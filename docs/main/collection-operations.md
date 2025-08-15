# Collection Operations

## Get the items in the selected collection

```javascript
const collection = ZoteroPane.getSelectedCollection();
const items = collection.getChildItems();
// or you can retrieve an array of itemIDs instead:
const itemIDs = collection.getChildItems(true);
```

## Create a subcollection of the selected collection

```javascript
const currentCollection = ZoteroPane.getSelectedCollection();
const collection = new Zotero.Collection();
collection.name = name;
collection.parentID = currentCollection.id;
const collectionID = await collection.saveTx();
```
