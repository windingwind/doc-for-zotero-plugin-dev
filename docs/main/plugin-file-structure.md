# Plugin File Structure

A Zotero plugin is made up of a set of files, similar to a web extension, but with specific modifications to work within Zotero’s ecosystem.

## manifest.json

The `manifest.json` file holds the metadata for your plugin, such as its name, version, and compatibility details. This file must be in the root directory of the plugin.

Here’s a sample `manifest.json`:

```json
{
  "manifest_version": 2,
  "name": "Make It Red",
  "version": "2.0",
  "description": "Makes everything red",
  "homepage_url": "https://github.com/zotero/make-it-red",
  "icons": {
    "48": "icon.svg",
    "96": "icon.svg"
  },
  "applications": {
    "zotero": {
      "id": "make-it-red@example.com",
      "update_url": "https://zotero-download.s3.amazonaws.com/tmp/make-it-red/updates-2.0.json",
      "strict_min_version": "6.999",
      "strict_max_version": "8.0.*"
    }
  }
}
```

Explanation of the fields in the `manifest.json` file are as follows. The fields marked with `*` are required.

- `manifest_version`\*: The version of the manifest file format. The only valid value is `2`.
- `name`\*: The name of the plugin.
- `version`\*: The version of the plugin. This follows [this](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version) version format.
- `description`: A brief description of the plugin. It will be shown in the _Plugin Manager_.
- `homepage_url`: The URL of the plugin's homepage. It will be shown in the _Plugin Manager_.
- `icons`: The icons for the plugin. See [icons]().

> 💡 About plugin icons
>
> For the best scalability and seamless theme integration, use the **SVG format** for your plugin icons. To ensure your icons adapt to Zotero's light and dark themes, include the attributes `fill="context-fill"` and `stroke="context-stroke"` in your SVG where appropriate. These attributes allow the icon's fill and stroke colors to inherit the foreground color of the current theme dynamically.
>
> **Best Practices**:
>
> - Test your icons in both light and dark modes to ensure they are visually clear and consistent.
> - Avoid hardcoding colors like black and white in your SVG to maintain adaptability.
>
> 🔗 For more details about working with SVGs, refer to [Mozilla - manifest.json/icons](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons).

- `applications/zotero`\*: The application-specific information. It is based on [browser_specific_settings.gecko](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) and must be present for Zotero to install your plugin.
  - `id`\*: The unique identifier for the plugin. It should be in the format `myplugin@mydomain.org`.
  - `update_url`: The URL of the update manifest. See also [Plugin Update](#142-plugin-update).
  - `strict_min_version`: The minimum version of Zotero that the plugin is compatible with. You should set it to `x.x.*` of the latest Zotero minor version that you have tested your plugin with.
  - `strict_max_version`: The maximum version of Zotero that the plugin is compatible with.

## bootstrap.js

The `bootstrap.js` file is the main script file for the plugin. It is executed during the plugin's lifecycle, such as when the plugin is loaded, unloaded, or updated. This file must be in the root directory of the plugin.

A `bootstrap.js` file containing functions to handle various events:

- Plugin lifecycle hooks
- Window hooks

> 🔗 For more details, see [Plugin Lifecycle](#21-plugin-lifecycle).

**Plugin lifecycle hooks**

Plugin lifecycle hooks are modeled after the legacy Mozilla [bootstrapped-extension framework](http://www.devdoc.net/web/developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Bootstrapped_Extensions.html#Bootstrap_entry_points "http://www.devdoc.net/web/developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Bootstrapped_Extensions.html#Bootstrap_entry_points"):

- `startup()`
- `shutdown()`
- `install()`
- `uninstall()`

Plugin lifecycle hooks are passed two parameters:

- An object with these properties:
  - `id`: The string of the plugin's unique identifier.
  - `version`: The string of the current version of the plugin.
  - `rootURI`: A path string pointing to the plugin files. You can use this to load specific files within your plugin, like `rootURI + 'style.css'`.
- A number representing the reason for the event, which can be checked against the following constants: `APP_STARTUP`, `APP_SHUTDOWN`, `ADDON_ENABLE`, `ADDON_DISABLE`, `ADDON_INSTALL`, `ADDON_UNINSTALL`, `ADDON_UPGRADE`, `ADDON_DOWNGRADE`

Any initialization that isn’t specific to a window should be handled in the `startup` function, and cleanup should occur in the `shutdown` function.

The `install()` and `startup()` bootstrap methods are called only after Zotero has initialized, and the `Zotero` object is automatically made available in the bootstrap scope, along with `Services`, `Cc`, `Ci`, and other Mozilla and browser objects.

Bootstrapped plugins can be disabled or uninstalled without restarting Zotero, so you'll need to make sure you remove all functionality in the `shutdown()` function.

**Window Hooks**

Window hooks let you perform actions when the main Zotero window opens or closes. This can be helpful for managing UI changes or other window-specific behaviors:

- `onMainWindowLoad()`: Called when the main Zotero window is opened.
- `onMainWindowUnload()`: Called when the main Zotero window is closed.

These hooks are passed an object containing the `window` property, which refers to the window being opened or closed.

If the main Zotero window is already open when your plugin loads, `onMainWindowLoad` won't be called on the existing windows. You'll need to manually call it for any existing windows:

```javascript
// In bootstrap.js
async function startup(data, reason) {
  // Do any initialization that should happen when the plugin is loaded

  // After initialization, call onMainWindowLoad for any existing main windows
  await Promise.all(
    Zotero.getMainWindows().map((win) => onMainWindowLoad(win)),
  );
}
```

Since the main window might be opened and closed multiple times during a session, changes you make to the UI (such as adding buttons or menus) should be done inside `onMainWindowLoad`, ensuring that every new window contains your updates.

When a window is closed, `onMainWindowUnload` is triggered. This is the time to clean up by removing any references to the window or objects within it, canceling any active timers, etc. This prevents memory leaks:

```javascript
function shutdown() {
  const windows = Zotero.getMainWindows();
  for (const win of windows) {
    win.document.getElementById("make-it-red-stylesheet")?.remove();
  }
}
```

> Currently, only one main window is supported, but some users may find ways to open multiple main windows, and this will be officially supported in a future version.

## Locale

Mozilla has introduced a new localization system called [Fluent](https://projectfluent.org/), replacing the older `.dtd` and `.properties` systems. While these older formats are still supported in Zotero 7, they will be removed in future versions. For future-proofing your plugin, it's recommended to use Fluent for localization.

Check out the [Fluent Syntax Guide](https://projectfluent.org/fluent/guide/ "https://projectfluent.org/fluent/guide/") to learn how to write Fluent files.

**Registering Fluent Files**

To add Fluent to your plugin, create a `locale` folder at the root of your plugin, and then add subfolders for each language. Place your `.ftl` (Fluent) files in these subfolders. For example:

```
locale/en-US/make-it-red.ftl
locale/fr-FR/make-it-red.ftl
locale/zh-CN/make-it-red.ftl
```

Any `.ftl` files you place in the locale subfolders will be automatically registered in Zotero's localization system.

To see a full list of supported languages, check the [Zotero locales](https://github.com/zotero/zotero/tree/main/chrome/locale).

> ❗️ It’s important to namespace the file names and keys in your Fluent files to avoid conflicts with Zotero or other plugins. For example, use file names like `make-it-red.ftl` instead of `strings.ftl`.

**Using a Fluent File in a Document**

Fluent files you include with your plugin can be applied to a document with a `<link>` element.

For example, a Fluent file located at

```
[plugin root]/locale/en-US/make-it-red.ftl
```

could be included in an XHTML file as

```html
<link rel="localization" href="make-it-red.ftl" />
```

If the document's default namespace is XUL, include HTML as an alternative namespace (`xmlns:html="http://www.w3.org/1999/xhtml"`) and prefix the link:

```html
<html:link rel="localization" href="make-it-red.ftl" />
```

If modifying an existing window, you can create a `<link>` element dynamically:

```javascript
// Suppose `window` is the window you're modifying
window.MozXULElement.insertFTLIfNeeded("make-it-red.ftl");
```

(`MozXULElement` will be a property of the window you're modifying.)

Please ensure that you have inserted the FTL into the window before making any changes to the DOM.

If adding to an existing window, be sure to remove the `<link>` in your plugin's `shutdown` function:

```javascript
// Suppose `window` is the window you're modifying
window.document.querySelector('[href="make-it-red.ftl"]').remove();
```

> 🔗 For more details about the Fluent localization system, see [Fluent documentation](https://projectfluent.org/dom-l10n-documentation/overview.html).

## Default Preferences

Zotero uses the preferences system for storing user preferences. Plugins can provide default values for its preferences in the `prefs.js` file. It should be in the root directory of the plugin.

Zotero provides a preferences system for storing user-specific settings. You can set default values for your plugin’s preferences using a `prefs.js` file. This file should be in the root directory of the plugin.

Here is an example of a `prefs.js` file:

```javascript
pref("extensions.make-it-red.intensity", 100);
```

This file defines a default preference for the "Make It Red" plugin, setting the `intensity` of the color to `100` by default.

These preferences will be read when plugins are installed or enabled and then on every startup.

> 🔗 For more details about the preferences in Zotero, see [Preferences](https://www.zotero.org/support/preferences).
> In the [Persisted Settings: Preferences](#23-persisted-settings-preferences) section, we'll cover more details about the preferences system.
