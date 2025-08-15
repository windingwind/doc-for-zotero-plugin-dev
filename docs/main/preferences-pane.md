# Adding Pane to Preferences Window

The preferences window allows users to configure settings in Zotero. Plugins should add their own panes to this window so users can easily adjust the plugin's options.

To add a pane, use the `Zotero.PreferencePanes.register` method in the `startup` hook. When the plugin is unloaded, the pane will be automatically removed.

The registered pane will be automatically unregistered when the plugin is unloaded.

For advanced customization options, refer to the [source code](https://github.com/zotero/zotero/blob/main/chrome/content/zotero/xpcom/preferencePanes.js).

```javascript
Zotero.PreferencePanes.register({
  pluginID: "make-it-red@zotero.org",
  src: "prefs.xhtml",
  scripts: ["prefs.js"],
  stylesheets: ["prefs.css"],
});
```

The `src` property should point to a file containing an XHTML fragment. Note that fragments cannot include a `<!DOCTYPE>` declaration. The default namespace is XUL and HTML tags can be accessed using `html:`. Below is a simple example:

```html
<linkset>
  <html:link rel="localization" href="make-it-red.ftl" />
</linkset>
<groupbox onload="MakeItRed_Preferences.init()">
  <label><html:h2>Colors</html:h2></label>
  <!-- [...] -->
</groupbox>
```

Organizing your pane as a sequence of top-level `<groupbox>`es ' will optimize it for the new preferences search mechanism. By default, all text in the DOM is searchable. To add custom keywords to an element (such as a button that opens a dialog), set its `data-search-strings-raw` attribute to a comma-separated list of keywords.

To avoid conflicts with other plugins, make sure all `class`, `id`, and `data-l10n-id` attributes in your preference pane are properly namespaced.
