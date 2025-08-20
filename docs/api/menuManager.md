> This API is not yet available in Zotero builds.

## Objects

<dl>
<dt><a href="#Zotero">Zotero</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MenuOptions">MenuOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="Zotero"></a>

## Zotero : <code>object</code>

**Kind**: global namespace

- [Zotero](#Zotero) : <code>object</code>
  - [.MenuManager](#Zotero.MenuManager)
    - [.registerMenu(options)](#Zotero.MenuManager.registerMenu) ⇒ <code>string</code> \| <code>false</code>
    - [.unregisterMenu(paneID)](#Zotero.MenuManager.unregisterMenu) ⇒ <code>boolean</code>

<a name="Zotero.MenuManager"></a>

### Zotero.MenuManager

Manages menu APIs.

**Kind**: static property of [<code>Zotero</code>](#Zotero)

- [.MenuManager](#Zotero.MenuManager)
  - [.registerMenu(options)](#Zotero.MenuManager.registerMenu) ⇒ <code>string</code> \| <code>false</code>
  - [.unregisterMenu(paneID)](#Zotero.MenuManager.unregisterMenu) ⇒ <code>boolean</code>

<a name="Zotero.MenuManager.registerMenu"></a>

#### MenuManager.registerMenu(options) ⇒ <code>string</code> \| <code>false</code>

Register custom menu

**Kind**: static method of [<code>MenuManager</code>](#Zotero.MenuManager)

| Param   | Type                                     |
| ------- | ---------------------------------------- |
| options | [<code>MenuOptions</code>](#MenuOptions) |

<a name="Zotero.MenuManager.unregisterMenu"></a>

#### MenuManager.unregisterMenu(paneID) ⇒ <code>boolean</code>

Unregister custom menu

**Kind**: static method of [<code>MenuManager</code>](#Zotero.MenuManager)

| Param  | Type                |
| ------ | ------------------- |
| paneID | <code>string</code> |

<a name="MenuOptions"></a>

## MenuOptions : <code>object</code>

**Kind**: global typedef  
**Properties**

| Name                | Type                                | Description                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| menuType            | <code>string</code>                 | The type of the menu item                                                                                                                                                                                                                                                                                                        |
| [l10nID]            | <code>string</code>                 | The l10n ID for the menu item                                                                                                                                                                                                                                                                                                    |
| [l10nArgs]          | <code>object</code>                 | Arguments for the l10n ID                                                                                                                                                                                                                                                                                                        |
| [icon]              | <code>string</code>                 | The icon for the menu item - For menu icons, it is recommended to use an SVG icon with a size of 16x16. Use `fill="context-fill"` in the SVG to use the default icon color for automatic hover and dark mode support.                                                                                                            |
| [darkIcon]          | <code>string</code>                 | The dark icon for the menu item - If not provided, the light icon will be used for both light and dark mode.                                                                                                                                                                                                                     |
| [enableForTabTypes] | <code>Array.&lt;string&gt;</code>   | The type of tab for which the menu item should be enabled. Available types are "library", "reader/\*", "reader/pdf", "reader/epub", "reader/snapshot", but other types are allowed as well for custom tab types. By default, the menu item is always enabled. Only for main window menubar menus and reader window menubar menus |
| [onShowing]         | <code>function</code>               | Function to run when the menu is about to be shown                                                                                                                                                                                                                                                                               |
| [onShown]           | <code>function</code>               | Function to run when the menu is shown                                                                                                                                                                                                                                                                                           |
| [onHiding]          | <code>function</code>               | Function to run when the menu is about to be hidden                                                                                                                                                                                                                                                                              |
| [onHidden]          | <code>function</code>               | Function to run when the menu is hidden                                                                                                                                                                                                                                                                                          |
| [onCommand]         | <code>function</code>               | Function to run when the menu is clicked                                                                                                                                                                                                                                                                                         |
| [menus]             | <code>Array.&lt;MenuData&gt;</code> | The menu items to add to the menu                                                                                                                                                                                                                                                                                                |
| menuID              | <code>string</code>                 | The unique ID of the menu                                                                                                                                                                                                                                                                                                        |
| pluginID            | <code>string</code>                 | The ID of the plugin registering the menu                                                                                                                                                                                                                                                                                        |
| target              | <code>string</code>                 | The target for the menu                                                                                                                                                                                                                                                                                                          |
| [menus]             | <code>Array.&lt;MenuData&gt;</code> | The menu items to add to the menu                                                                                                                                                                                                                                                                                                |
