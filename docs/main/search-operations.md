# Search Operations

If you are focused on data access, the first thing you will want to do will be to retrieve items from your Zotero library. Creating an in-memory search is a good start.

```javascript
const s = new Zotero.Search();
s.libraryID = Zotero.Libraries.userLibraryID;
```

## Search for items containing a specific tag

Starting with the above code, we then use the following code to retrieve items in My Library with a particular tag:

```javascript
s.addCondition("tag", "is", "tag name here");
const itemIDs = await s.search();
```

## Advanced searches

```javascript
const s = new Zotero.Search();
s.libraryID = Zotero.Libraries.userLibraryID;
s.addCondition("joinMode", "any"); // joinMode defaults to 'all' as per the advanced search UI
```

To add the other conditions available in the advanced search UI, use the following:

```javascript
s.addCondition("recursive", "true"); // equivalent of "Search subfolders" checked
s.addCondition("noChildren", "true"); // "Only show top level children
s.addCondition("includeParentsAndChildren", "true");
("Include parent and child ...");
```

## Search by collection

To search for a collection or a saved search you need to know the ID or key:

```javascript
s.addCondition("collectionID", "is", collectionID); // e.g., 52
s.addCondition("savedSearchID", "is", savedSearchID);

s.addCondition("collection", "is", collectionKey); // e.g., 'C72FDAP2'
s.addCondition("savedSearch", "is", savedSearchKey);
```

## Search by creator

```javascript
const name = "smith";
s.addCondition("creator", "contains", name);
```

## Search by tag

To search by tag, you use the tag text:

```javascript
const tagName = "something";
s.addCondition("tag", "is", tagName);
```

## Search by other fields

The complete list of other fields available to search on is on the [search fields](https://www.zotero.org/support/dev/client_coding/javascript_api/search_fields "dev:client_coding:javascript_api:search_fields") page.

## Execute the search

Once the search conditions have been set up, then it's time to execute the results:

```javascript
const itemIDs = await s.search();
```

This returns the item IDs in the search as an array. The next thing to do is to get the Zotero items for the array of IDs:

```javascript
const items = await Zotero.Items.getAsync(itemIDs);
```
