<!-- markdownlint-disable MD033 MD036 MD040 -->

# 1 Getting Started

## 1.1 What is Zotero Plugin

Plugins can customize the experience of using Zotero and enhance its capability by adding functions and features to Zotero.

The Zotero plugin has a similar structure of browser's web-extension, while developing a Zotero plugin is quite different from developing a browser extension. As a desktop application, Zotero allows plugins to be very flexible and powerful, like using Zotero database, accessing local files, and communicating with other applications.

## 1.2 Prerequisites

- Basic knowledge of web technologies, including [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- A computer with [Zotero](https://www.zotero.org/download/) installed.
- And most importantly, a good idea of what you want to build!

## 1.3 Your First Plugin

In this section, we'll guide you through developing your first Zotero plugin. We'll use the official example plugin [Make-It-Red](https://github.com/zotero/make-it-red) as an example.

### 1.3.1 Developing the Plugin

Make sure you have [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/) installed and configured.

First, open the terminal and run the following code to clone the official plugin example repo make-it-red:

```bash
git clone git@github.com:zotero/make-it-red.git
```

Download necessary dependencies:

```bash
cd ./make-it-red
npm install
```

Run the following commands to build the plugin:

```bash
npm run build
```

The build results are `build/make-it-red-2.0.xpi`.

> 🔗 For Zotero plugins, we use `xpi` file extension. It is zipped with all the script files and resources. See [Plugin File Structure](#141-plugin-file-structure) for more details about the XPI file.

### 1.3.2 Running the Plugin

#### 1.3.2.1 Installing Manually

For plugin developers, it's always recommended to use [Beta Builds](https://www.zotero.org/support/beta_builds).

> 🔗 During the plugin development, it is strongly recommended to use a separate profile. You can follow [this document](https://www.zotero.org/support/kb/multiple_profiles) to create a new profile. Be cautious when developing plugins on profile with your important data!

In the menu bar, click `Tools` -> `Plugin` to open the _Plugins Manager_ window.

To install the plugin, from the settings (⚙️) menu in the Plugins Manager, click `Install Plugin From File...` and select the `xpi` file we just built. Alternatively, you can drag-drop the `xpi` file to the _Plugin Manager_ window.

After the plugin is successfully installed and enabled, you can see the text in the items list and the library list are turned to red, as indicated by the example plugin's name _Make-It-Red_.

![Run Plugin Result](run-plugin.png)

#### 1.3.2.2 Loading from Source Code

It could be annoying to manually install the plugin every time you make a change. You can load the plugin from the source code directly. Every time you start Zotero, the plugin will be loaded using the latest code.

After creating your plugin's source directory with sample code, you can tell Zotero to load the plugin by creating an extension proxy file. (This is a technique that used to be possible for Firefox extension development, though it's since been discontinued in Firefox.)

1. Close Zotero.
2. Create a text file in the 'extensions' directory of your Zotero profile directory named after the extension id (e.g., `myplugin@mydomain.org`). The file contents should be the absolute path to the root of your plugin source code directory, where your `manifest.json` or `bootstrap.js` file is located.
3. Open `prefs.js` in the Zotero profile directory in a text editor and delete the lines containing `extensions.lastAppBuildId` and `extensions.lastAppVersion`. Save the file and restart Zotero. This will force Zotero to read the 'extensions' directory and install your plugin from source, after which you should see it listed in Tools → Add-ons. This is only necessary once.
4. Whenever you make changes to your plugin code, start up Zotero from the command line and pass the `-purgecaches` flag to force Zotero to re-read any cached files. (This may no longer be necessary with Zotero 7.) You'll likely want to make an alias or shell script that also includes the `-ZoteroDebugText` and `-jsconsole` flags and perhaps `-p <Profile>`, where `<Profile>` is the name of a development profile.

> 💡 Try this out!
>
> After setting up the development environment, make a change to the plugin code and see the result in Zotero.
> Let's _make it blue_, instead of red.
>
> 1. Open `src/style.css`, change the `color: red;` in line 2 to `color: blue`.
> 2. Run `npm run build` again, then install the plugin again manually.
> 3. Quit (Ctrl/Cmd + Q) and restart Zotero
> 4. You will see the text in the items list and the library list are turned to blue now.

### 1.3.3 Debugging the Plugin

#### 1.3.3.1 _Run JavaScript_ Window

To run JavaScript in Zotero, the easiest way is using the _Run JavaScript_ window.

In the menu bar, click `Tools` -> `Developer` -> `Run JavaScript`. Type the code in the left panel and click `Run` to execute. The result will be shown on the right panel.

> 💡 Try this out!
>
> Select an item in the library, then run `ZoteroPane.getSelectedItems()[0]` in the _Run JavaScript_ window.

![Run JS window](run-js.png)

> 🔗 For more details about the _Run JavaScript_ window, see [Running Ad Hoc JavaScript in Zotero](https://www.zotero.org/support/dev/client_coding/javascript_api#running_ad_hoc_javascript_in_zotero).

#### 1.3.3.2 Debug Output

Zotero has a built-in debug output system that are more friendly to users for providing feedback and debugging information.

Plugin developers can use the `Zotero.debug` function to output messages to the debug console. The debug console can be opened by clicking `Help` -> `Debug Output Logging` -> `View Output`.

> 💡 Try this out!
>
> Run `Zotero.debug("Hello, World!")` in the _Run JavaScript_ window and check the debug output.

![alt text](debug-output.png)

> 🔗 For more details about using the debug output, see [Debug Output Logging](https://www.zotero.org/support/debug_output#zotero).

Although it's not possible for plugin developers to access users' debug output using the Debug ID, you can ask users to enable debug output, reproduce the issue, and send you the debug output.

#### 1.3.3.3 DevTools

Since Zotero is based on Firefox, it's possible to use the Firefox Developer Tools to interact with the DOM, set code breakpoints, follow network requests, and more.

> 🔗 For more details about the devtools, see [Firefox DevTools User Docs](https://firefox-source-docs.mozilla.org/devtools-user/).

Zotero 7 beta builds include the Firefox 115 devtools. To start a beta build with the Browser Toolbox open, pass the `-jsdebugger` flag on the command line:

```bash
# the /path/to/zotero is the path to the Zotero executable
# For MacOS:
# /Applications/Zotero.app/Contents/MacOS/zotero
# For Windows:
# C:\Program Files (x86)\Zotero\zotero.exe
/path/to/zotero -ZoteroDebugText -jsdebugger
```

When running Zotero from source, passing `-d` flag to the [build_and_run script](https://www.zotero.org/support/dev/client_coding/building_the_desktop_app#helper_script "dev:client_coding:building_the_desktop_app") will rebuild (`-r`) with the devtools included and pass `-jsdebugger`.

![DevTools](devtools.png)

> 💡 Try this out!
>
> Run `Zotero.getMainWindow().console.log("Hello, World!")` from the Run JS window and check the devtools' console.

### 1.3.4 Conclusion

In section 1.3, we introduced how to develop your first Zotero plugin, run the plugin, and debug the plugin. We also provided some tips for debugging the plugin.

By now, you should have a basic understanding of how to run the example plugin and how to debug it. You might still don't know how to create the features you want, but don't worry, we'll cover that in the following sections.

In section 1.4, we'll introduce the anatomy of a Zotero plugin, so that you can have an overview of the plugin structure and how it works.

## 1.4 Plugin Anatomy

In this section, we'll introduce the structure of a Zotero plugin, including the plugin file structure and the update mechanism.

### 1.4.1 Plugin File Structure

A plugin consists of a collection of files, packaged for distribution and installation. It is similar to a web extension, but with some differences.

#### 1.4.1.1 manifest.json

The `manifest.json` file is the metadata file for the plugin. It contains the plugin's name, version, description, and other information.

This file must be in the root directory of the plugin.

Here is an example of a `manifest.json` file:

```json
{
  "manifest_version": 2,
  "name": "Make It Red",
  "version": "2.0",
  "description": "Makes everything red",
  "homepage_url": "https://github.com/zotero/make-it-red",
  "applications": {
    "zotero": {
      "id": "make-it-red@example.com",
      "update_url": "https://zotero-download.s3.amazonaws.com/tmp/make-it-red/updates-2.0.json",
      "strict_min_version": "6.999",
      "strict_max_version": "7.0.*"
    }
  }
}
```

Explanation of the fields in the `manifest.json` file are as follows. The fields marked with `*` are required.

- `manifest_version`\*: The version of the manifest file format. Currently, the only valid value is `2`.
- `name`\*: The name of the plugin.
- `version`\*: The version of the plugin. The version number should follow [this](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version) format.
- `description`: A brief description of the plugin. It will be shown in the _Plugin Manager_.
- `homepage_url`: The URL of the plugin's homepage. It will be shown in the _Plugin Manager_.
- `applications/zotero`\*: The application-specific information. It is based on [browser_specific_settings.gecko](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) and must be present for Zotero to install your plugin.
  - `id`\*: The unique identifier for the plugin. It should be in the format of `myplugin@mydomain.org`.
  - `update_url`: The URL of the update manifest. See also [Plugin Update](#142-plugin-update).
  - `strict_min_version`: The minimum version of Zotero that the plugin is compatible with. You should set it to `x.x.*` of the latest Zotero minor version that you have tested your plugin with.
  - `strict_max_version`: The maximum version of Zotero that the plugin is compatible with.

#### 1.4.1.2 bootstrap.js

The `bootstrap.js` file is the main script file for the plugin. It is executed in the plugin's lifecycle, such as when the plugin is loaded, unloaded, or updated. It must be in the root directory of the plugin.

A `bootstrap.js` file containing functions to handle various events:

- Plugin lifecycle hooks
- Window hooks

> 🔗 For more details, see [Plugin Lifecycle](#21-plugin-lifecycle).

**Plugin lifecycle hooks**

Plugin lifecycle hooks are modeled after the legacy Mozilla [bootstrapped-extension framework](http://www.devdoc.net/web/developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Bootstrapped_Extensions.html#Bootstrap_entry_points "http://www.devdoc.net/web/developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Bootstrapped_Extensions.html#Bootstrap_entry_points"):

- `startup()`
- `shutdown()`
- `install()`
- `uninstall()`

Plugin lifecycle hooks are passed two parameters:

- An object with these properties:
  - `id`, a string of the plugin id
  - `version`, a string of the plugin version
  - `rootURI`, a string URL pointing to the plugin's files. For XPIs, this will be a `jar:file:///` URL. This value will always end in a slash, so you can append a relative path to get a URL for a file bundled with your plugin (e.g., `rootURI + 'style.css'`).
- A number representing the reason for the event, which can be checked against the following constants: `APP_STARTUP`, `APP_SHUTDOWN`, `ADDON_ENABLE`, `ADDON_DISABLE`, `ADDON_INSTALL`, `ADDON_UNINSTALL`, `ADDON_UPGRADE`, `ADDON_DOWNGRADE`

Any initialization unrelated to specific windows should be triggered by `startup`, and removal should be triggered by `shutdown`.

The `install()` and `startup()` bootstrap methods are called only after Zotero has initialized, and the `Zotero` object is automatically made available in the bootstrap scope, along with `Services`, `Cc`, `Ci`, and other Mozilla and browser objects.

Bootstrapped plugins can be disabled or uninstalled without restarting Zotero, so you'll need to make sure you remove all functionality in the `shutdown()` function.

**Window Hooks**

Window hooks, available only in Zotero 7, are called on the opening and closing of the main Zotero window:

- `onMainWindowLoad()`
- `onMainWindowUnload()`

Window hooks are passed one parameter:

- An object with a `window` property containing the target window

Main windows might already be opened when the plugin is loaded, in which case `onMainWindowLoad` will not be called for those windows. You should always check for the existence of any main windows and call it manually if necessary.

```javascript
// In bootstrap.js
async function startup(data, reason) {
  // Do any initialization that should happen when the plugin is loaded

  // After initialization, call onMainWindowLoad for any existing main windows
  await Promise.all(
    Zotero.getMainWindows().map((win) => onMainWindowLoad(win))
  );
}
```

On some platforms, the main window can be opened and closed multiple times during a Zotero session, so any window-related activities, such as modifying the main UI, adding menus, or binding shortcuts must be performed by `onMainWindowLoad` so that new main windows contain your changes.

You must then **remove all references to a window or objects within it, cancel any timers, etc.**, when `onMainWindowUnload` is called, or else you'll risk creating a memory leak every time the window is closed. DOM elements added to a window will be automatically destroyed when the window is closed, so you only need to remove those in `shutdown()`, which you can do by cycling through all windows:

```javascript
function shutdown() {
  let windows = Zotero.getMainWindows();
  for (let win of windows) {
    win.document.getElementById("make-it-red-stylesheet")?.remove();
  }
}
```

> Currently, only one main window is supported, but some users may find ways to open multiple main windows, and this will be officially supported in a future version.

Some plugins may require additional hooks in Zotero itself to work well as bootstrapped plugins. If you're having trouble accomplishing something you were doing previously via XUL overlays, let us know on [zotero-dev](https://groups.google.com/g/zotero-dev "https://groups.google.com/g/zotero-dev").

#### 1.4.1.3 Locale

Mozilla has introduced a new localization system called [Fluent](https://projectfluent.org/ "https://projectfluent.org/"), which replaces both `.dtd` and `.properties` localization. While both `.dtd` and `.properties` are still supported in the current version of Zotero 7, `.dtd` files and `.properties` files will be remove in the future. To ensure future compatibility, plugin should aim to use Fluent for localization going forward.

See the [Fluent Syntax Guide](https://projectfluent.org/fluent/guide/ "https://projectfluent.org/fluent/guide/") for more information on creating Fluent files.

**Registering Fluent Files**

To use Fluent in your plugin, create a `locale` folder in your plugin root with subfolders for each locale, and place `.ftl` files within each locale folder:

```
locale/en-US/make-it-red.ftl
locale/fr-FR/make-it-red.ftl
locale/zh-CN/make-it-red.ftl
```

Any `.ftl` files you place in the locale subfolders will be automatically registered in Zotero's localization system.

All supported locales are list in [locales](https://github.com/zotero/zotero/tree/main/chrome/locale).

**Using a Fluent File in a Document**

Fluent files you include with your plugin can be applied to a document with a `<link>` element.

For example, a Fluent file located at

```
[plugin root]/locale/en-US/make-it-red.ftl
```

could be included in an XHTML file as

```html
<link rel="localization" href="make-it-red.ftl" />
```

If the document's default namespace is XUL, include HTML as an alternative namespace (`xmlns:html="http://www.w3.org/1999/xhtml"`) and prefix the link:

```html
<html:link rel="localization" href="make-it-red.ftl" />
```

If modifying an existing window, you can create a `<link>` element dynamically:

```javascript
// Suppose `window` is the window you're modifying
window.MozXULElement.insertFTLIfNeeded("make-it-red.ftl");
```

(`MozXULElement` will be a property of the window you're modifying.)

Please ensure that you have inserted the FTL into the window before making any changes to the DOM.

If adding to an existing window, be sure to remove the `<link>` in your plugin's `shutdown` function:

```javascript
// Suppose `window` is the window you're modifying
window.document.querySelector('[href="make-it-red.ftl"]').remove();
```

#### 1.4.1.4 Preferences

Zotero uses the preferences system for storing user preferences. Plugins can provide default values for its preferences in the `prefs.js` file. It should be in the root directory of the plugin.

Here is an example of a `prefs.js` file:

```javascript
pref("extensions.make-it-red.intensity", 100);
```

These preferences will be read when plugins are installed or enabled and then on every startup.

> 🔗 For more details about the preferences in Zotero, see [Preferences](https://www.zotero.org/support/preferences).
> In [Persisted Settings](#23-persisted-settings-preferences) section, we'll cover more details about the preferences system.

### 1.4.2 Plugin Update

The update manifests are set up to demonstrate upgrading across all versions, but normally a plugin would point to a single update manifest that was updated as new versions were available.

Zotero uses a [Mozilla-style JSON update manifest](https://extensionworkshop.com/documentation/manage/updating-your-extension/ "https://extensionworkshop.com/documentation/manage/updating-your-extension/").

The update manifest JSON is not included in the plugin XPI file. It should be hosted online, and the URL should be specified in the plugin's `update_url` field in the `manifest.json` file of the plugin.

Here is the official plugin example's update manifest:

```json
{
  "addons": {
    // The plugin id
    "make-it-red@zotero.org": {
      "updates": [
        {
          "version": "2.0", // The version of the plugin
          "update_link": "https://download.zotero.org/plugins/make-it-red/make-it-red-2.0.xpi", // The URL of the XPI file
          "update_hash": "sha256:4a6dd04c197629a02a9c6beaa9ebd52a69bb683f8400243bcdf95847f0ee254a", // The hash of the XPI file
          "applications": {
            "zotero": {
              "strict_min_version": "6.999" // The minimum version of Zotero that the plugin is compatible with
            }
          }
        }
      ]
    }
  }
}
```

# 2 Concepts

In this section, we'll introduce some key concepts of Zotero plugin development, including the plugin lifecycle, Zotero data model, persisted settings, notifier events, privileged v.s unprivileged, and reader.

## 2.1 Plugin LifeCycle

Each plugin goes through a lifecycle, from being loaded to being unloaded. During this lifecycle, it runs a series of hooks that allow the plugin to perform actions at specific points in time.

| Hook                 | Called when...                                                                   | Description                                                                                      |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `install`            | Called when the plugin is manually installed or updated                          | Perform any necessary setup. Should not be used for actual tasks. The plugin is not yet running. |
| `startup`            | Called when the plugin is loaded                                                 | Perform any necessary initialization. The plugin is now running.                                 |
| `shutdown`           | Called when the plugin is unloaded                                               | Perform any necessary cleanup. The plugin will not be running.                                   |
| `uninstall`          | Called when the plugin is manually uninstalled                                   | Perform any necessary cleanup. The plugin is no longer running.                                  |
| `onMainWindowLoad`   | Called when the main Zotero main window is opened. May be called multiple times. | Perform any necessary initialization for the main window. The window is now open.                |
| `onMainWindowUnload` | Called when the main Zotero main window is closed. May be called multiple times. | Perform any necessary cleanup for the main window. The window is now closed.                     |

The figure below shows the lifecycle of a plugin and how the hooks are called.

![lifecycle](lifecycle.png)

> 💡 Try this out!
>
> Add the following line to the `bootstrap.js` file's `startup()` function of the example plugin, then apply the changes and restart Zotero with debug output enabled.
>
> ```javascript
> Zotero.debug("Hello, World! The plugin is loaded.");
> ```
>
> Check the debug output to see if the message is printed when the plugin is loaded.
>
> Disable and then enable the plugin in the _Plugins Manager_ to see if the message is printed again.

## 2.2 Zotero Data Model

Zotero has a unified data model that represents all types of data in Zotero.

For developers, the data model is based on the concept of data objects, which are instances of classes that represent different types of data.

For example, a PDF file will be represented by an attachment `Item` object (instance of `Zotero.Item`), which usually belongs to a regular `Item` object (instance of `Zotero.Item`). This item can be in multiple `Collection` objects (instance of `Zotero.Collection`). Eventually, all these data objects are stored in a `Library` (instance of `Zotero.Library`).

This relation can be described as follows:

![Data Model Example](data-model-example.png)

Each data class has a corresponding object for managing instances of the class. For example, `Zotero.Items` is the object for managing `Zotero.Item` instances. You can use these plural objects to create, retrieve, update, and delete the corresponding data objects.

For example, you can get a `Zotero.Item` instance by its key using the object `Zotero.Items`:

```javascript
let item = await Zotero.Items.getAsync(itemID);
```

> ❓ What is the difference between `getAsync` and `get`?
>
> The `getAsync` method is an asynchronous method that returns a promise, while the `get` method is a synchronous method that returns the object directly. The asynchronous method ensures that the objects are loaded.
>
> For most cases, it is recommended to use the asynchronous method.

The table below lists the **class** and its corresponding plural **object**:

| Class               | Manager Object       |
| ------------------- | -------------------- |
| `Zotero.DataObject` | `Zotero.DataObjects` |
| `Zotero.Collection` | `Zotero.Collections` |
| `Zotero.Search`     | `Zotero.Searches`    |
| `Zotero.Item`       | `Zotero.Items`       |
| `Zotero.FeedItem`   | `Zotero.FeedItems`   |
| `Zotero.Library`    | `Zotero.Libraries`   |
| `Zotero.Group`      | `Zotero.Groups`      |
| `Zotero.Feed`       | `Zotero.Feeds`       |

### 2.2.1 Library

All items and collections in Zotero belong to a **Library**. There are three types of libraries in Zotero:

- User Library
- Group
- Feed

Each library has a unique `id`, which can be used to get the library instance.

The user library is the default library that contains all the items and collections created by the user. The user library ID can be retrieved using `Zotero.Libraries.userLibraryID`.

```javascript
// The user library ID
let libraryID = Zotero.Libraries.userLibraryID;
// Get the library by ID
let library = await Zotero.Libraries.getAsync(libraryID);
// Print the library ID
Zotero.debug(library.id);
// Print the library type, which is "user" for the user library.
// Can be "group" or "feed" for other types of libraries.
Zotero.debug(library.type);
```

You can get all the libraries using `Zotero.Libraries.getAll()`.

### 2.2.2 Data Object

The `Zotero.DataObject` class is the base class for all data objects, including `Zotero.Collection`, `Zotero.Item`, and `Zotero.Search`.

Each data object has a unique `key` (string) and an `id` (number).

> ❗️ Do not rely on the `id` for identifying the data object!
>
> The `key` is unique across all devices _(within one library)_, while the `id` is unique within the local database. In extreme cases, the `id` can be changed, but the `key` always remains the same.

Other important shared properties and methods include:

- `libraryID`: indicates which library the data object belongs to.
- `objectType`: indicates the type of the data object. Can be `collection`, `item`, `search`, etc.
- `version`: indicates the version of the data object. The version is incremented every time the data object is updated.
- `deleted`: indicates whether the data object is trashed.
- `save()` and `saveTx()`: saves the changes to the database.
- `erase()` and `eraseTx()`: completely erase the data object from the database.

To create a new data object, you can use the `new` keyword. For example, to create a new item:

```javascript
let item = new Zotero.Item();
```

Each time you modify a data object, you should call the `save()` or `saveTx()` method to save the changes to the database. We'll cover this in more detail in the following sections.

> ❓ What is the difference between `save()` and `saveTx()`?
>
> The `saveTx()` creates a transaction for saving the changes, while the `save()` should be called inside a [transaction](https://en.wikipedia.org/wiki/Database_transaction). For multiple changes in one transaction, they will be saved together when the transaction is committed.
>
> The `save()` is useful when you have multiple changes to save together.
>
> For `erase()` and `eraseTx()`, the same principle applies.

Besides the shared properties and methods, different types of data objects have their own properties and methods. The inheritance relationship is shown in the following UML diagram:

![uml](./uml_dataObject.png)

We'll discuss the different types of data objects in the following sections.

### 2.2.3 Collection

A **Collection** contains a group of items and other collections.

Besides the inherited properties and methods from the `DataObject`, a collection object has the following notable properties:

- `name`: the name of the collection.
- `parent`: the parent collection of the collection. A top-level collection has a `null` parent.
- `parentKey`: the key of the parent collection.
- `parentID`: the ID of the parent collection.
- `getChildCollections()`: gets the child collections of the collection.
- `getChildItems()`: gets the items in the collection.
- `addItem()`/`addItems()`: adds an item or items to the collection.
- `removeItem()`/`removeItems()`: removes an item or items from the collection.

The `Zotero.Collections` object is used to manage collection objects. Here are some examples of how to use the `Zotero.Collections` object:

```javascript
// Get all collections in the user library
let collections = Zotero.Collections.getByLibrary(
  Zotero.Libraries.userLibraryID
);
// Get the collection by key
let collection = Zotero.Collections.getByLibraryAndKey(
  Zotero.Libraries.userLibraryID,
  collections[0].key
);
// Get the collection by ID
collection = Zotero.Collections.get(collection.id);
// Get child items of the collection
let itemIDs = collection.getChildItems().map((item) => item.id);
// Get collections containing the items
collections = await Zotero.Collections.getCollectionsContainingItems(itemIDs);
```

### 2.2.4 Search

The **Search** class is used to search for items in a library. It has the following properties and methods:

- `addCondition(field, operator, value, required): number`: adds a search condition.
- `updateCondition(searchConditionID, condition, operator, value, required): void`: updates a search condition.
- `removeCondition(searchConditionID): void`: removes a search condition.
- `getCondition(searchConditionID): ConditionType`: gets a search condition. Returns an array of `ConditionType` (object with `condition`, `operator`, `value`, `required` properties).
- `getConditions(): { [id: number]: ConditionType }`: gets all search conditions.
- `search(asTempTable): Promise<number[]> | Promise<string>`: executes the search.

<details>
<summary>All available operators and conditions</summary>

Be aware that the available operators and conditions are subject to change. Some operators and conditions are only supposed to be used internally.

```typescript
type Operator =
  | "is"
  | "isNot"
  | "true"
  | "false"
  | "isInTheLast"
  | "isBefore"
  | "isAfter"
  | "contains"
  | "doesNotContain"
  | "beginsWith"
  | "isLessThan"
  | "isGreaterThan"
  | "any"
  | "all"
  | "true"
  | "false";
type Conditions =
  | "numPages"
  | "numberOfVolumes"
  | "abstractNote"
  | "anyField"
  | "accessDate"
  | "applicationNumber"
  | "archive"
  | "artworkSize"
  | "assignee"
  | "fulltextContent"
  | "fileTypeID"
  | "author"
  | "authority"
  | "bookAuthor"
  | "callNumber"
  | "childNote"
  | "citationKey"
  | "code"
  | "codeNumber"
  | "collection"
  | "committee"
  | "conferenceName"
  | "country"
  | "creator"
  | "date"
  | "dateAdded"
  | "dateModified"
  | "DOI"
  | "edition"
  | "editor"
  | "extra"
  | "filingDate"
  | "history"
  | "ISBN"
  | "ISSN"
  | "issue"
  | "itemType"
  | "journalAbbreviation"
  | "language"
  | "libraryCatalog"
  | "archiveLocation"
  | "medium"
  | "meetingName"
  | "note"
  | "number"
  | "pages"
  | "place"
  | "priorityNumbers"
  | "programmingLanguage"
  | "publicationTitle"
  | "publisher"
  | "references"
  | "reporter"
  | "rights"
  | "runningTime"
  | "scale"
  | "section"
  | "series"
  | "seriesNumber"
  | "seriesText"
  | "seriesTitle"
  | "session"
  | "shortTitle"
  | "status"
  | "system"
  | "tag"
  | "title"
  | "type"
  | "url"
  | "versionNumber"
  | "volume"
  | "deleted"
  | "noChildren"
  | "unfiled"
  | "retracted"
  | "publications"
  | "feed"
  | "includeParentsAndChildren"
  | "includeParents"
  | "includeChildren"
  | "recursive"
  | "joinMode"
  | "quicksearch-titleCreatorYear"
  | "quicksearch-titleCreatorYearNote"
  | "quicksearch-fields"
  | "quicksearch-everything"
  | "quicksearch"
  | "blockStart"
  | "blockEnd"
  | "collectionID"
  | "savedSearchID"
  | "savedSearch"
  | "itemTypeID"
  | "tagID"
  | "lastName"
  | "field"
  | "datefield"
  | "year"
  | "numberfield"
  | "libraryID"
  | "key"
  | "itemID"
  | "annotationText"
  | "annotationComment"
  | "fulltextWord"
  | "tempTable";
```

</details>

### 2.2.5 Item

The `Item` is the most common data object in Zotero. Some important types of items include:

- Regular Item: A bibliographic item, such as a book, article, or webpage.
- Attachment Item: An attachment, such as a PDF file, a snapshot, or an image in the note.
- Note Item: A note item.
- Annotation Item: An annotation item. It always belongs to an attachment item.

> 📖 Terminology: Child Item v.s. Standalone Item
>
> A child item is an item that has a parent item, such as an attachment item with a parent regular item. A standalone item is an item that does not have a parent item. Attachment items may be either child items or standalone items.

The `Item` class has the following important properties and methods:

- `itemType`: the type of the item. For example, `book`, `journalArticle`, `attachment`, `note`, etc.
- `parentItem`: the parent item of the item. A standalone item has a `null` parent.
- `topLevelItem`: the top-level item of the item. If the item is a standalone item, the top-level item is the item itself.
- `isTopLevelItem()`: indicates whether the item is a top-level item.
- `isRegularItem()`: indicates whether the item is a regular item.
- `isAttachment()`: indicates whether the item is an attachment item.
- `isAnnotation()`: indicates whether the item is an annotation item.
- `isNote()`: indicates whether the item is a note item.
- `numChildren()`: gets the number of child items of the item.
- `getTags()`: gets the tags of the item.
- `setTags()`: sets the tags of the item.
- `replaceTag()`: replaces the tags of the item.
- `addTag()`: adds a tag to the item.
- `removeTag()`: removes a tag from the item.
- `addToCollection()`: adds the item to a collection.
- `getCollections()`: gets the collections containing the item.
- `setCollections()`: sets the collections containing the item.
- `inCollection()`: indicates whether the item is in a collection.
- `clone()`: returns an unsaved copy of the item without itemID and key.
- `moveToLibrary()`: moves the item to another library.

For Regular Items, the following additional properties and methods would be useful:

- `getField()`: gets the value of a field of the item.
- `setField()`: sets the value of a field of the item.
- `getAttachments()`: gets the attachments of the item.
- `getBestAttachment()`: gets the best attachment of the item. Looks for attachment in the following order: oldest PDF attachment matching parent URL, oldest PDF attachment not matching parent URL, oldest non-PDF attachment matching parent URL, and old non-PDF attachment not matching parent URL.
- `getNotes()`: gets the notes of the item.
- `numAttachments()`: gets the number of child attachments of the item.
- `numNotes()`: gets the number of child notes of the item.
- `addRelatedItem()`: adds a related item to the item.
- `removeRelatedItem()`: removes a related item from the item.

For Attachment Items, the following additional properties and methods would be useful:

- `attachmentFilename`: the filename of the attachment.
- `attachmentPath`: the raw attachment path string as stored in DB (e.g., "storage:foo.pdf", "attachments:foo/bar.pdf", "/Users/foo/Desktop/bar.pdf"). Can be set as absolute path or prefixed string ("storage:foo.pdf").
- `attachmentContentType`: the content type of the attachment. For example, `application/pdf`, `text/html`, `application/epub+zip`, etc.
- `attachmentText`: the text content of the attachment. Currently works on HTML, PDF, and plaintext attachments.
- `isPDFAttachment()`: indicates whether the item is a PDF attachment.
- `isSnapshotAttachment()`: indicates whether the item is a snapshot (Webpage) attachment.
- `isEPUBAttachment()`: indicates whether the item is an EPUB attachment.
- `getFilePath()`/`getFilePathAsync()`: gets the file path of the attachment.
- `fileExists()`: indicates whether the file of the attachment exists.
- `renameAttachmentFile()`: renames the file of the attachment.
- `getAnnotations()`: gets the child annotations of the attachment.

For Note Items, the following additional properties and methods would be useful:

- `getNote()`: gets the note content.
- `setNote()`: sets the note content.
- `getNoteTitle()`: gets the note title.

For Annotation Items, the following additional properties and methods would be useful:

- `annotationType`: the type of the annotation. For example, `highlight`, `text`, `image`, `ink`, `note` (sticky note, not the note item), etc.
- `annotationText`: the text content of the annotation.
- `annotationComment`: the comment of the annotation.

To trash an item, you can use `Zotero.Items.trash()`/`Zotero.Items.trashTx()`.

```javascript
let item = await Zotero.Items.getAsync(itemID);
await Zotero.Items.trashTx(item);
```

## 2.3 Persisted Settings: Preferences

Zotero provides a set of APIs for managing persisted settings, which are stored in the Zotero data directory's `prefs.js` file.

These settings will be persisted across Zotero sessions and are available to all parts of the plugin. However, the settings are not synced across devices.

A preference is a key-value pair. The key is a string, usually in the format of `extensions.myplugin.mykey`, where `myplugin` is the plugin unique identifier and `mykey` is the key of the preference. The value can be a string, number, or boolean.

As we mentioned in the [Plugin Structure/Preferences](#1414-preferences) section, plugins can provide default values for its preferences in its own `prefs.js` file.

The `Zotero.Prefs` object is used to manage the persisted settings. It has the following important methods:

- `get(key, global)`: gets the value of a preference.
- `set(key, value, global)`: sets the value of a preference.
- `clear(key, global)`: clears the value of a preference.
- `registerObserver(key, handler, global)`: registers an observer for a preference. The handler will be called when the preference is changed.
- `unregisterObserver(observerID)`: unregisters an observer.

For example:

```javascript
// Get the value of a preference
let value = Zotero.Prefs.get("extensions.myplugin.mykey", true);
// Set the value of a preference
Zotero.Prefs.set("extensions.myplugin.mykey", "myvalue", true);
// Clear the value of a preference
Zotero.Prefs.clear("extensions.myplugin.mykey", true);
// For Zotero's built-in preferences, the key should be in the format of "extensions.zotero.zoterokey".
// The call can be simplified as:
value = Zotero.Prefs.get("zoterokey");
// Equivalent to:
value = Zotero.Prefs.get("extensions.zotero.zoterokey", true);
```

To observe the changes of a preference:

```javascript
let key = "extensions.myplugin.mykey";
// Register the observer
let observerID = Zotero.Prefs.registerObserver(
  "extensions.myplugin.mykey",
  (value) => {
    Zotero.debug(`Preference ${key} changed to ${value}`);
  },
  true
);
```

To unregister the observer:

```javascript
Zotero.Prefs.unregisterObserver(observerID);
```

> If you want to store complex data, you can serialize (`JSON.stringify`) and deserialize (`JSON.parse`) the data.

## 2.4 Notification System

Zotero has a built-in notification system that allows plugins to be notified when a change is made in the data layer — for example, when an item is added to the library. Within Zotero itself, this is used mostly to update the UI when items change.

The notification system is based on the observer pattern. Plugins can register observers for specific events and receive notifications when the events occur.

The `Zotero.Notifier` object is used to manage the notification system. It has the following important methods:

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
let observerID = Zotero.Notifier.registerObserver(
  {
    notify: (event, type, ids, extraData) => {
      if (type === "item") {
        Zotero.debug(`Event ${event} of type ${type} is triggered`);
      }
    },
  },
  ["add", "modify", "delete"]
);
```

You can create a new item and check the debug output to see if the output is printed.

To unregister the observer:

```javascript
Zotero.Notifier.unregisterObserver(observerID);
```

## 2.5 Privileged v.s Unprivileged: Browser Window, HTML Window, and Sandbox

In Zotero, there are different types of scopes for running code. Different scopes have different privileges and access to different APIs.

> ❗️ Be aware of the scope when running code. Some APIs are only available in specific scopes.
>
> Zotero is NOT a NodeJS environment. Don't try to use NodeJS APIs in the plugin!

**Privileged v.s Unprivileged**

Similar to Firefox, Zotero inherits the same security model. Different levels of privileges have different security principals and different access.

> 🔗 For more details about security model, see [Script Security](https://firefox-source-docs.mozilla.org/dom/scriptSecurity/index.html#script-security)

For security reasons, when you try to access an object in a less privileged scope from a privileged scope , e.g. access content in an HTML window from the plugin's sandbox scope, sometimes you don't get the expected value. This is called the Xray vision.

For example, if you try to access the attribute attached to the `window` object in HTML window, you may get an undefined value.

```javascript
// In the HTML window
window.myAttribute = { value: 42 };
```

```javascript
// In the plugin's sandbox
let myAttribute = window.myAttribute;
Zotero.debug(myAttribute); // undefined

// To access the attribute, you need to waive the Xray vision
myAttribute = window.wrappedJSObject.myAttribute;
Zotero.debug(myAttribute); // { value: 42 }
```

> 🔗 For more details about the Xray vision, see [Xray vision](https://firefox-source-docs.mozilla.org/dom/scriptSecurity/xray_vision.html).

**Browser Window**

XHTML window that runs in privileged mode. It has full access to Zotero APIs and other browser APIs. It is used for the most of the Zotero windows, such as the main window and the preferences window.

The browser window scope is similar to a regular HTML scope, but with additional privileges and some differences in the DOM structure and global variables. Some important differences include:

- Some HTML elements are possibly not available, e.g. `document.body` does not exist in the main window. This is the major cause that some third-party libraries designed for the web cannot be used in the browser window.
- Access to privileged APIs, e.g. `ChromeUtils`, `Services`, `Zotero`, etc.

**HTML Window**

HTML window that runs in unprivileged mode. It has limited/no access to Zotero APIs and no access to browser APIs. It is used for some iframe windows, such as the note editor and the reader.

If the code is in an HTML iframe, is is not be able to access privileged APIs directly. It should communicate with the parent window using `window.postMessage()`.

**Sandbox**

A secure environment that can have different privileges. It can be used to run untrusted code, such as the code from the web. The plugin runs in a sandbox environment in privileged mode.

The plugin's sandbox scope is similar to the worker scope, but with additional privileges and access to Zotero APIs. Some important differences include:

- Access to privileged APIs.
- Global variables, such as `Zotero`, `ChromeUtils`, `Services`, `ChromeWorker`, `Localization`, `IOUtils`, `PathUtils`, etc.

> ❓ What is the difference between the main window scope and the plugin's sandbox scope?
>
> - Both scopes have access to privileged APIs.
> - The main window scope has window-specific APIs, such as `window` and `document`.
> - Global variables are different. For example, `Zotero` is available in both scopes, but `ZoteroPane` is only available in the main window scope, as it is related to the DOM of the main window.
> - The main window scope is recycled when the window is closed, while the plugin's sandbox scope is persistent until the plugin is unloaded.

## 2.6 Resource registry

In most cases, you can directly access the resources in the plugin's directory by using the relative path with `rootURI`, e.g., `rootURI + 'style.css'`.

However, for some cases, e.g. loading a script from the plugin's directory in the main window, you need a `chrome://` URI.

Here is an example of registering the `chrome/content` directory of the plugin as `chrome://myplugin/content` resource:

```javascript
// In the plugin's code

var chromeHandle;

function startup() {
  // ...

  var aomStartup = Components.classes[
    "@mozilla.org/addons/addon-manager-startup;1"
  ].getService(Components.interfaces.amIAddonManagerStartup);
  var manifestURI = Services.io.newURI(rootURI + "manifest.json");
  chromeHandle = aomStartup.registerChrome(manifestURI, [
    ["content", "myplugin", rootURI + "chrome/content/"],
  ]);

  // ...
}

function shutdown() {
  // ...

  // Unregister the chrome handle for the plugin uri
  if (chromeHandle) {
    chromeHandle.destruct();
    chromeHandle = null;
  }

  // ...
}
```

Now, you can use the `chrome://myplugin/content/` URI to access the resources in the `chrome/content` directory. For example, the URI of file `${pluginRoot}/chrome/content/script.js` would be `chrome://myplugin/content/script.js`.

## 2.7 Reader

### 2.7.1 `Reader` vs `ReaderInstance`

![uml](./uml_reader.png)

### 2.7.2 Views

#### 2.7.2.1 Snapshot View

#### 2.7.2.2 ePub View

#### 2.7.2.3 PDF View

# 3 UX Guidelines

## 3.1 Zotero Pane

### 3.1.1 Collections Pane

### 3.1.2 Items Pane

### 3.1.3 Item Pane and Context Pane

## 3.2 Tabs

## 3.3 Reader

## 3.3 Note Editor

## 3.4 Dark Mode

# 4 Best Practice

In this section, we'll introduce some best practices for achieving common tasks in Zotero plugin development.

All the code examples are supposed to run in the plugin's sandbox environment.

## 4.1 Item Tree API

## 4.2 Preference Page API

## 4.3 Item Pane Section API

## 4.4 Menu

### 4.4.1 Menu Bar

Zotero's main window has a menu bar that contains various menus, such as `File` and `Edit`. You can add your own menu items to the menu bar. Besides the main menu bar, you can also add menu items to the context menu.

The menu bar is defined by the `menubar#main-menubar` element in `zoteroPane.xhtml`, i.e., the main window's XHTML file.

To add a menu item to the menu bar, you can insert menu item or menu popup elements in the `onMainWindowLoad` hook.

For example, to add a menu item to the `Tools` menu:

```javascript
// In the plugin's code

function onMainWindowLoad({ window }) {
  // ...

  let document = window.document;

  // Insert FTL file to the document
  window.MozXULElement.insertFTLIfNeeded("myplugin-menu.ftl");
  // Get the Tools menu popup
  let toolsMenu = document.querySelector("#menu_ToolsPopup");
  // Create a new menu item
  let menuItem = document.createXULElement("menuitem");
  // Set the label of the menu item
  // The `label` is localized using the FTL file
  menuItem.dataset.l10nId = "myplugin-menu-item";
  menuItem.addEventListener("command", () => {
    window.alert("My Menu Item is clicked");
  });
  // Insert the menu item to the Tools menu
  toolsMenu.appendChild(menuItem);

  // ...
}
```

In the `myplugin-menu.ftl` file:

```ftl
myplugin-menu-item =
  .label = My Menu Item
```

The full list of the query selectors for the menu bar is as follows:

- `#menu_FilePopup`: for the `File` menu.
- `#menu_EditPopup`: for the `Edit` menu.
- `#menu_viewPopup`: for the `View` menu.
- `#menu_goPopup`: for the `Go` menu.
- `#menu_ToolsPopup`: for the `Tools` menu.
- `#menu_HelpPopup`: for the `Help` menu.

### 4.4.2 Library Context Menu

The library context menu is the context menu that appears when you right-click on an item/collection in the library pane.

Similar to the menu bar, you can add menu items to the library context menu by inserting menu item or menu popup elements in the `onMainWindowLoad` hook.

The full list of the query selectors for the library context menu is as follows:

- `#zotero-collectionmenu`: for the collection context menu.
- `#zotero-itemmenu`: for the item context menu.

### 4.4.3 Reader Context Menu

The reader context menu is the context menu that appears when you right-click on the reader pane.

Unlike the menu bar and the library context menu, the reader context menu is not defined in the main window's XHTML file. Instead, it is dynamically created by the reader instance.

To add menu items to the reader context menu, you can use the `Zotero.Reader.registerEventListener` method in the `startup` hook. Note that you need to call `Zotero.Reader.unregisterEventListener` in the `shutdown` hook to avoid memory leaks.

For example, to add a menu item to the reader annotation context menu:

```javascript
// In the plugin's code

function startup() {
  // ...

  // Register the event listener for the reader annotation context menu
  Zotero.Reader.registerEventListener(
    "createAnnotationContextMenu",
    (event) => {
      let { reader, params, append } = event;
      // Create a new menu item
      append({
        label: "Test",
        onCommand() {
          reader._iframeWindow.alert(
            "Selected annotations: " + params.ids.join(", ")
          );
        },
      });
    }
  );

  // ...
}
```

The full list of the supported types for the `registerEventListener` method is as follows:

- createColorContextMenu
- createViewContextMenu
- createAnnotationContextMenu
- createThumbnailContextMenu
- createSelectorContextMenu

## 4.5 Injecting to Reader UI

The reader UI is inside an iframe. To inject elements to the reader UI, you can use the `Zotero.Reader.registerEventListener` method in the `startup` hook. Note that you need to call `Zotero.Reader.unregisterEventListener` in the `shutdown` hook to avoid memory leaks.

For example, to add an element to display the translation of the selected text in the reader's text selection popup:

```javascript
Zotero.Reader.registerEventListener("renderTextSelectionPopup", (event) => {
  let { reader, doc, params, append } = event;
  let container = doc.createElement("div");
  container.append("Loading…");
  append(container);
  setTimeout(
    () =>
      container.replaceChildren("Translated text: " + params.annotation.text),
    1000
  );
});
```

The full list of the supported types for the `registerEventListener` method is as follows:

- renderTextSelectionPopup
- renderSidebarAnnotationHeader
- renderToolbar

## 4.6 HTTP Request

Zotero provides a set of APIs for making HTTP requests. The `Zotero.HTTP` object is used to make HTTP requests. It has the following important methods:

- `request(method, url, options)`: makes an HTTP request.

### 4.6.1 Making a GET Request

```javascript
let url = "https://jsonplaceholder.typicode.com/posts/1";
let req = await Zotero.HTTP.request("GET", url);
Zotero.debug(req.status); // 200
Zotero.debug(req.statusText); // OK
Zotero.debug(req.response); // string
```

If you want to get the JSON response, pass the `responseType` option as `json`.

```javascript
let url = "https://jsonplaceholder.typicode.com/posts/1";
let req = await Zotero.HTTP.request("GET", url, { responseType: "json" });
Zotero.debug(req.response); // object
```

### 4.6.2 Making a POST Request

```javascript
let url = "https://jsonplaceholder.typicode.com/posts";
let data = {
  title: "foo",
  body: "bar",
  userId: 1,
};
let req = await Zotero.HTTP.request("POST", url, {
  data,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});
Zotero.debug(req.status); // 201
Zotero.debug(req.statusText); // Created
Zotero.debug(req.response); // object
```

## 4.7 File I/O

Zotero provides a set of APIs for file I/O operations in `Zotero.File`. You can also use [IOUtils](https://firefox-source-docs.mozilla.org/dom/ioutils_migration.html) and [PathUtils](https://searchfox.org/mozilla-esr115/source/dom/chrome-webidl/PathUtils.webidl) for the operations that are not provided by `Zotero.File`.

### 4.7.1 Reading file

```javascript
let path = "/Users/user/Desktop/data.json";
let data = await Zotero.File.getContentsAsync(path);
Zotero.debug(data);
```

### 4.7.2 Writing file

```javascript
let path = "/Users/user/Desktop/file.txt";
let data = "This is some text.";
await Zotero.File.putContentsAsync(path, data);
```

### 4.7.3 Renaming file

```javascript
let oldPath = "/Users/user/Desktop/old.txt";
let newPath = "/Users/user/Desktop/new.txt";
await Zotero.File.rename(oldPath, newPath);
```

### 4.7.4 Removing file

```javascript
let path = "/Users/user/Desktop/file.txt";
await Zotero.File.removeIfExists(path);
```

### 4.7.5 Iterating directory

```javascript
let dirPath = "/Users/user/Desktop";
await Zotero.File.iterateDirectory(dirPath, (entry) => {
  Zotero.debug(entry.name);
});
```

### 4.7.6 Picking File or Directory

First, you need to import the `FilePicker` class:

```javascript
let { FilePicker } = ChromeUtils.import(
  "chrome://zotero/content/modules/filePicker.jsm"
);
```

Then, you can use the `FilePicker` class to pick a file or directory.

Pick a directory:

```javascript
let fp = new FilePicker();
let defaultPath = "/Users/user/Desktop";
if (defaultPath) {
  fp.displayDirectory = defaultPath;
}
fp.init(Zotero.getMainWindow(), "Select Directory", fp.modeGetFolder);
fp.appendFilters(fp.filterAll);
let rv = await fp.show();

if (rv == fp.returnOK) {
  let path = PathUtils.normalize(fp.file);
  if (defaultPath == path) {
    Zotero.debug("Same directory selected");
  } else {
    Zotero.debug("Selected directory: " + path);
  }
}
```

Pick a file (open):

```javascript
let fp = new FilePicker();
fp.init(Zotero.getMainWindow(), "Select File", fp.modeOpen);
// Allow `*.*` files
fp.appendFilters(fp.filterAll);
// Allow only `*.txt` files
fp.appendFilter("TXT files", "*.txt");
let rv = await fp.show();

if (rv == fp.returnOK || rv == fp.returnReplace) {
  let inputFile = Zotero.File.pathToFile(fp.file);
  let content = await Zotero.File.getContentsAsync(inputFile);
  Zotero.debug(content);
}
```

Pick a file (save):

```javascript
let fp = new FilePicker();
fp.init(Zotero.getMainWindow(), "Save File", fp.modeSave);
// Allow `*.*` files
fp.appendFilters(fp.filterAll);
// Allow only `*.txt` files
fp.appendFilter("TXT files", "*.txt");
let rv = await fp.show();

if (rv == fp.returnOK || rv == fp.returnReplace) {
  let outputFile = Zotero.File.pathToFile(fp.file);
  await Zotero.File.putContentsAsync(outputFile, "Hello, World!");
}
```

## 4.8 Heavy Task with Web Worker

For heavy tasks that may block the main thread, you can use a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to run the task in the background in a separate thread.

### 4.8.1 Don't Block the Main Thread

For example, we have a heavy task that takes a long time to finish. It takes the item's title as input and shifts the characters by 1 in the ASCII table for each character for `10000000` times.

```javascript
function compute(title) {
  let startTimestamp = Date.now();
  let result = title;
  for (let i = 0; i < 10000000; i++) {
    result = result
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) + 1))
      .join("");
  }
  let endTimestamp = Date.now();
  let time = endTimestamp - startTimestamp;
  return { result, time };
}

// Get the selected item
let item = Zotero.getActiveZoteroPane().getSelectedItems()[0];
// Get the title of the item
let title = item.getField("title");

// Run the heavy task
// DO NOT run this! It will block the main thread.
// let { result, time } = compute(title);
// Print the result and the time
// Zotero.debug(result);
// Zotero.debug(`Time: ${time} ms`);
```

If you run it in the main thread, it will block the UI and make the Zotero window unresponsive.

![Run heavy task in main thread](worker-main.png)

> ❗️ Be aware of the performance of the code. Do not run heavy tasks in the main thread. Freezing the UI is a bad user experience.

### 4.8.2 Running Heavy Task in Web Worker

You may want to directly run the full code in the worker. However, the worker does not have access to the privileged APIs. It cannot access the item data directly.

![Run heavy task in worker thread](worker-sub.png)

To run the task in a web worker, you can create a new worker and run the task in the worker.

Suppose you have a worker script `worker.js`, which is registered at `chrome://myplugin/content/worker.js`.

```javascript
// worker.js

// Definition of the function `compute` is the same as above

// Listen to the message from the main thread
addEventListener("message", (event) => {
  let { type, jobID } = event.data;
  if (type === "compute") {
    let { title } = event.data;
    let { result, time } = compute(title);
    postMessage({
      type: "computeReturn",
      jobID,
      result,
      time,
    });
  }
});
```

In the main thread, you can create a new worker using the worker script.

```javascript
// In the plugin's code
let worker = new Worker("chrome://myplugin/content/worker.js");

// Receive the message from the worker
worker.addEventListener("message", (event) => {
  let { type } = event.data;
  if (type === "computeReturn") {
    let { result, time } = event.data;
    // Print the result and the time
    Zotero.debug(result);
    Zotero.debug(`Time: ${time} ms`);
  }
});

// Generate a random job ID, which is used to identify the job
function randomJobID() {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Run the heavy task in the worker
 * @param {string} title The title of the item
 * @returns {Promise<{ result: string, time: number }>} The result and the time of the task
 */
async function runCompute(title) {
  return new Promise((resolve) => {
    let jobID = randomJobID();
    // Send the message to the worker to run the heavy task
    worker.postMessage({ type: "compute", jobID, title });
    // Listen to the message from the worker
    worker.addEventListener("message", function handler(event) {
      let { type, jobID: returnJobID } = event.data;
      if (type !== "computeReturn" || returnJobID !== jobID) {
        return;
      }
      let { result, time } = event.data;
      // Remove the listener
      worker.removeEventListener("message", handler);
      resolve({ result, time });
    });
  });
}
```

Then you can call the `runCompute` function to run the heavy task in the worker and get the result in the main thread.

```javascript
// In the plugin's code

// Get the selected item
let item = Zotero.getActiveZoteroPane().getSelectedItems()[0];
// Get the title of the item
let title = item.getField("title");

// Run the heavy task in the worker
let { result, time } = await runCompute(title);
// Print the result and the time
Zotero.debug(result);
Zotero.debug(`Time: ${time} ms`);
```

The worker will run the task in the background and send the result back to the main thread. The main thread will receive the result and print it. The UI will not be blocked during the task.

![Run heavy task using web worker](worker-oneway.png)

### 4.8.3 Variant: Accessing Zotero APIs in the Worker

The web worker does not have direct access to the privileged APIs. If you want to access privileged APIs in the worker, you can write a wrapper function in the main thread and call the function from the worker using message passing.

In this variant, when calling `compute` from the main thread, we want the worker to decide which item to process. We can send the item ID to the worker and let the worker request the item data from the main thread.

We use the parameter `itemID` to pass the item ID to the worker in the `compute` message. The worker will request the item data from the main thread by sending a message with the type `getItemTitle` and the item ID. The main thread will receive the message and send the item title back to the worker. After receiving the item title, the worker will run the `compute` task and send the result back to the main thread.

Let's first define the message handler for getting the item title and the corresponding wrapper function in the main thread.

```javascript
// In the plugin's code

// Wrapper function to get the item title
function getItemTitle(itemID) {
  let item = Zotero.Items.get(itemID);
  if (!item) {
    return null;
  }
  return item.getField("title");
}

// Same definition of the `worker`, `runCompute`, and `randomJobID` functions as above

// Listen to the message from the worker to handle the item title request
worker.addEventListener("message", (event) => {
  let { type, jobID: returnJobID } = event.data;
  if (type !== "getItemTitle" || returnJobID !== jobID) {
    return;
  }
  let { itemID } = event.data;
  let title = getItemTitle(itemID);
  postMessage({
    type: "getItemTitleReturn",
    jobID,
    title,
  });
});
```

Then, we can modify the worker script to request the item title from the main thread.

```javascript
// worker.js

// Generate a random job ID, which is used to identify the job
function randomJobID() {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Request the item title from the main thread
 * @param {number} itemID The ID of the item
 * @returns {Promise<string | null>} The title of the item
 */
async function runGetItemTitle(itemID) {
  return new Promise((resolve) => {
    let jobID = randomJobID();
    // Send the message to the main thread to get the item title
    postMessage({
      type: "getItemTitle",
      jobID,
      itemID,
    });
    // Listen to the message from the main thread
    addEventListener("message", function handler(event) {
      let { type, jobID: returnJobID } = event.data;
      if (type !== "getItemTitleReturn" || returnJobID !== jobID) {
        return;
      }
      let { title } = event.data;
      removeEventListener("message", handler);
      resolve(title);
    });
  });
}

// Listen to the message from the main thread
addEventListener("message", async (event) => {
  let { type, jobID } = event.data;
  if (type === "compute") {
    let { itemID } = event.data;
    // First, get the item title from the main thread
    let title = await runGetItemTitle(itemID);
    if (!title) {
      return;
    }
    // Then, run the heavy task
    let { result, time } = compute(title);
    // Finally, send the result back to the main thread
    postMessage({
      type: "computeReturn",
      jobID,
      result,
      time,
    });
  }
});
```

Now, you can call the `runCompute` function with the item ID to run the heavy task in the worker.

```javascript
// In the plugin's code

// Get the selected item
let item = Zotero.getActiveZoteroPane().getSelectedItems()[0];
// Get the item ID of the item
let itemID = item.id;

// Run the heavy task in the worker
let { result, time } = await runCompute(itemID);
// Print the result and the time
Zotero.debug(result);
Zotero.debug(`Time: ${time} ms`);
```

When you run the code, the worker will receive the item ID, request the item title from the main thread, run the heavy task, and send the result back to the main thread.

![Run variant heavy task in web worker](worker-twoway.png)

## 4.9 Item Operations

### 4.9.1 Creating Items

A typical operation might include a call to `Zotero.Items.get()` to retrieve a `Zotero.Item` instance, calls to `Zotero.Item` methods on the retrieved object to modify data, and finally a `save()` (within a transaction) or `saveTx()` (outside a transaction) to save the modified data to the database.

```javascript
let item = new Zotero.Item("book");
item.setField("title", "Much Ado About Nothing");
item.setCreators([
  {
    firstName: "William",
    lastName: "Shakespeare",
    creatorType: "author",
  },
]);
let itemID = await item.saveTx();
return itemID;

// Fetch saved items with Items.get(itemID)
let item = Zotero.Items.get(itemID);
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

### 4.9.2 Getting Item Data

Different item (specifically, regular item) types have different fields. To get the value of a field, use the `getField()` method. For example, to get an item's abstract, we get the `abstractNote` field from the Zotero item:

```javascript
let abstract = item.getField("abstractNote");
```

> 🔗 For more details about item fields, see [item_types_and_fields](https://www.zotero.org/support/kb/item_types_and_fields).

### 4.9.3 Child notes

To get the child notes for an item, we use the following code:

```javascript
let noteIDs = item.getNotes();
```

This returns an array of ids of note items. To get each note in turn we just iterate through the array:

```javascript
for (let id of noteIDs) {
  let note = Zotero.Items.get(id);
  let noteHTML = note.getNote();
}
```

### 4.9.4 Related Items

let relatedItems = item.relatedItems;

**Set two items as related to each other**

Given two items `itemA` and `itemB`. We can set them as related items to each other by using the `addRelatedItem` function:

```javascript
itemA.addRelatedItem(itemB);
await itemA.saveTx();
itemB.addRelatedItem(itemA);
await itemB.saveTx();
```

### 4.9.5 Attachments full text

The code below gets the full text of HTML and PDF items in storage and put the data in an array:

```javascript
let item = ZoteroPane.getSelectedItems()[0];
let fulltext = [];
if (item.isRegularItem()) {
  // not an attachment already
  let attachmentIDs = item.getAttachments();
  for (let id of attachmentIDs) {
    let attachment = Zotero.Items.get(id);
    if (attachment.isPDFAttachment() || attachment.isSnapshotAttachment()) {
      fulltext.push(await attachment.attachmentText);
    }
  }
}
```

## 4.10 Collection Operations

### 4.10.1 Get the items in the selected collection

```javascript
let collection = ZoteroPane.getSelectedCollection();
let items = collection.getChildItems();
// or you can obtain an array of itemIDs instead:
let itemIDs = collection.getChildItems(true);
```

### 4.10.2 Create a subcollection of the selected collection

```javascript
let currentCollection = ZoteroPane.getSelectedCollection();
let collection = new Zotero.Collection();
collection.name = name;
collection.parentID = currentCollection.id;
let collectionID = await collection.saveTx();
return collectionID;
```

## 4.11 Search Operations

If you are focused on data access, the first thing you will want to do will be to retrieve items from your Zotero library. Creating an in-memory search is a good start.

```javascript
let s = new Zotero.Search();
s.libraryID = Zotero.Libraries.userLibraryID;
```

### 4.11.1 Search for items containing a specific tag

Starting with the above code, we then use the following code to retrieve items in My Library with a particular tag:

```javascript
s.addCondition("tag", "is", "tag name here");
let itemIDs = await s.search();
```

### 4.11.2 Advanced searches

```javascript
let s = new Zotero.Search();
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

### 4.11.3 Search by collection

To search for a collection or a saved search you need to know the ID or key:

```javascript
s.addCondition("collectionID", "is", collectionID); // e.g., 52
s.addCondition("savedSearchID", "is", savedSearchID);

s.addCondition("collection", "is", collectionKey); // e.g., 'C72FDAP2'
s.addCondition("savedSearch", "is", savedSearchKey);
```

### 4.11.4 Search by creator

```javascript
let name = "smith";
s.addCondition("creator", "contains", name);
```

### 4.11.5 Search by tag

To search by tag, you use the tag text:

```javascript
let tagName = "something";
s.addCondition("tag", "is", tagName);
```

### 4.11.6 Search by other fields

The complete list of other fields available to search on is on the [search fields](https://www.zotero.org/support/dev/client_coding/javascript_api/search_fields "dev:client_coding:javascript_api:search_fields") page.

### 4.11.7 Execute the search

Once the search conditions have been set up, then it's time to execute the results:

```javascript
let itemIDs = await s.search();
```

This returns the item ids in the search as an array. The next thing to do is to get the Zotero items for the array of IDs:

```javascript
let items = await Zotero.Items.getAsync(itemIDs);
```

## 4.12 Interacting with ZoteroPane

The code below shows how to interact with the Zotero pane to get the currently selected items.

```javascript
let ZoteroPane = Zotero.getActiveZoteroPane();
```

Then grab the currently selected items from the Zotero pane:

```javascript
// Get first selected item
let selectedItems = ZoteroPane.getSelectedItems();
let item = selectedItems[0];
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

## 4.13 Unload the Plugin

### 4.13.1 DOM Elements and Listeners

### 4.13.2 Notifier and Other Observers
