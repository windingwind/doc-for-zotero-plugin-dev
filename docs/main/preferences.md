# Preferences

Zotero allows plugins to store settings that persist across sessions. These preferences are stored as key-value pairs in Zotero's `prefs.js` file, located in the data directory. They are available throughout the plugin but do not sync across devices.

A preference is a key-value pair. The typical format for a preference key is `extensions.myplugin.mykey`, where `myplugin` is your plugin's unique identifier, and `mykey` is the setting's name. Values can be strings, numbers, or booleans.

As mentioned in the [Plugin File Structure](./plugin-file-structure.md#default-preferences) section, the plugin can provide default values for its preferences in its own `prefs.js` file.

Use the `Zotero.Prefs` object to interact with preferences. Key methods include:

- `get(key, global)`: gets the value of a preference.
- `set(key, value, global)`: sets the value of a preference.
- `clear(key, global)`: clears the value of a preference.
- `registerObserver(key, handler, global)`: registers an observer for a preference. The handler will be called when the preference is changed.
- `unregisterObserver(observerID)`: unregisters an observer.

For example:

```javascript
// Get the value of a preference
const value = Zotero.Prefs.get("extensions.myplugin.mykey", true);
// Set the value of a preference
Zotero.Prefs.set("extensions.myplugin.mykey", "myvalue", true);
// Clear the value of a preference
Zotero.Prefs.clear("extensions.myplugin.mykey", true);
```

The `global` argument simplifies access to Zotero's built-in preference keys. When `global` is not set or `false`, Zotero automatically prefixes the key with `"extensions.zotero."`, so you don't need to type the full key path.

```javascript
// Using the simplified format for a built-in Zotero preference:
value = Zotero.Prefs.get("zoterokey");
// This is equivalent to the full format:
value = Zotero.Prefs.get("extensions.zotero.zoterokey", true);
```

To observe the changes of a preference:

```javascript
const key = "extensions.myplugin.mykey";
// Register the observer
const observerID = Zotero.Prefs.registerObserver(
  "extensions.myplugin.mykey",
  (value) => {
    Zotero.debug(`Preference ${key} changed to ${value}`);
  },
  true,
);
```

To unregister the observer:

```javascript
Zotero.Prefs.unregisterObserver(observerID);
```

> **Tip**: For complex data, use `JSON.stringify` and `JSON.parse` to store and retrieve serialized values.
