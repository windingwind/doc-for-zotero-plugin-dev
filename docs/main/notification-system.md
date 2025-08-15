# Notification System

Zotero's notification system allows plugins to respond when certain events occur, such as when items are added, modified, or removed from the library. This system is used internally to update the user interface when data changes.

The notification system uses an "observer pattern." An observer is a function that waits for a specific event to happen, and then runs in response. Plugins can register observers to listen for specific events.

The `Zotero.Notifier` object lets you register and manage observers. Key methods include:

- `registerObserver(ref, types, id, priority): string`: registers an observer for an event. The `ref` is an object (`{ notify: (event, type, ids, extraData) => void }`) that implements the `notify` method. The `types` is an array of event types. The `id` is a unique identifier for debug output. The `priority` is the priority of the observer.
- `unregisterObserver(observerID)`: unregisters an observer.

<details>
<summary>All available event and types</summary>

The following are the available events and types. Be aware that not all types are available for all events. You can dive into [the source](https://github.com/search?q=repo%3Azotero%2Fzotero+%2Fzotero.notifier.%28queue%7Ctrigger%29%2F&type=code) for all possible notifies.

```typescript
type Event =
  | "add"
  | "modify"
  | "delete"
  | "move"
  | "remove"
  | "refresh"
  | "redraw"
  | "trash"
  | "unreadCountUpdated"
  | "index"
  | "open"
  | "close"
  | "select";
type Type =
  | "collection"
  | "search"
  | "share"
  | "share-items"
  | "item"
  | "file"
  | "collection-item"
  | "item-tag"
  | "tag"
  | "setting"
  | "group"
  | "trash"
  | "bucket"
  | "relation"
  | "feed"
  | "feedItem"
  | "sync"
  | "api-key"
  | "tab"
  | "itemtree"
  | "itempane";
```

</details>

For example, to observe the `add`, `modify`, and `delete` events on the `item` type:

```javascript
const observerID = Zotero.Notifier.registerObserver(
  {
    notify: (event, type, ids, extraData) => {
      if (type === "item") {
        Zotero.debug(`Event ${event} of type ${type} is triggered`);
      }
    },
  },
  ["add", "modify", "delete"],
);
```

You can create a new item and check the debug output to see if the output is printed.

To unregister the observer:

```javascript
Zotero.Notifier.unregisterObserver(observerID);
```
