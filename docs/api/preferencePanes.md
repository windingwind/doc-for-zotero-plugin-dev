<a name="Zotero"></a>

## Zotero : <code>object</code>

**Kind**: global namespace

- [Zotero](#Zotero) : <code>object</code>
  - [.PreferencePanes](#Zotero.PreferencePanes)
    - [.register(options)](#Zotero.PreferencePanes.register) ⇒ <code>Promise.&lt;string&gt;</code>
    - [.unregister(id)](#Zotero.PreferencePanes.unregister)

<a name="Zotero.PreferencePanes"></a>

### Zotero.PreferencePanes

Manages preference panes.

**Kind**: static property of [<code>Zotero</code>](#Zotero)

- [.PreferencePanes](#Zotero.PreferencePanes)
  - [.register(options)](#Zotero.PreferencePanes.register) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.unregister(id)](#Zotero.PreferencePanes.unregister)

<a name="Zotero.PreferencePanes.register"></a>

#### PreferencePanes.register(options) ⇒ <code>Promise.&lt;string&gt;</code>

Register a pane to be displayed in the preferences. The pane XHTML (`src`)
is loaded as a fragment, not a full document, with XUL as the default
namespace and (X)HTML tags available under `html:`.

The pane will be unregistered automatically when the registering plugin
shuts down.

**Kind**: static method of [<code>PreferencePanes</code>](#Zotero.PreferencePanes)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves to the ID of the pane if successfully added

| Param                 | Type                              | Description                                                                                                                                                          |
| --------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options               | <code>Object</code>               |                                                                                                                                                                      |
| options.pluginID      | <code>string</code>               | ID of the plugin registering the pane                                                                                                                                |
| options.src           | <code>string</code>               | URI of an XHTML fragment, optionally relative to the plugin's root                                                                                                   |
| [options.id]          | <code>string</code>               | Represents the pane and must be unique. Automatically generated if not provided                                                                                      |
| [options.parent]      | <code>string</code>               | ID of parent pane (if provided, pane is hidden from the sidebar)                                                                                                     |
| [options.label]       | <code>string</code>               | Displayed as the pane's label in the sidebar. If not provided, the plugin's name is used                                                                             |
| [options.image]       | <code>string</code>               | URI of an icon to be displayed in the navigation sidebar, optionally relative to the plugin's root. If not provided, the plugin's icon (from manifest.json) is used. |
| [options.scripts]     | <code>Array.&lt;string&gt;</code> | Array of URIs of scripts to load along with the pane, optionally relative to the plugin's root                                                                       |
| [options.stylesheets] | <code>Array.&lt;string&gt;</code> | Array of URIs of CSS stylesheets to load along with the pane, optionally relative to the plugin's root                                                               |
| [options.helpURL]     | <code>string</code>               | If provided, a help button will be displayed under the pane and the provided URL will open when it is clicked                                                        |

**Example**  
Register a pane with a script and stylesheet:

```javascript
Zotero.PreferencePanes.register({
  pluginID: "my-plugin@my-namespace.com",
  src: `${rootURI}my-pane.xhtml`,
  id: "my-plugin-pane",
  scripts: [`${rootURI}my-pane.js`],
  stylesheets: [`${rootURI}my-pane.css`],
});
```

<a name="Zotero.PreferencePanes.unregister"></a>

#### PreferencePanes.unregister(id)

Called automatically on plugin shutdown.

**Kind**: static method of [<code>PreferencePanes</code>](#Zotero.PreferencePanes)

| Param | Type                | Description                                                                      |
| ----- | ------------------- | -------------------------------------------------------------------------------- |
| id    | <code>string</code> | ID of the pane to unregister, as returned by `Zotero.PreferencePanes.register()` |
