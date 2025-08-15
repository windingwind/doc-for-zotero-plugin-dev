# Resource Registry

To access resources in your plugin's directory, you can often use a relative path with `rootURI`, like this:

```javascript
const stylesheetPath = `${rootURI}style.css`;
```

However, for some cases, e.g. loading a script from the plugin's directory in the main window, you need a `chrome://` URI.

Here is an example of registering the `chrome/content` directory of the plugin as `chrome://myplugin/content` resource:

```javascript
// In the plugin's bootstrap.js

let chromeHandle;

function startup() {
  // ...

  const aomStartup = Components.classes[
    "@mozilla.org/addons/addon-manager-startup;1"
  ].getService(Components.interfaces.amIAddonManagerStartup);
  const manifestURI = Services.io.newURI(`${rootURI}manifest.json`);
  chromeHandle = aomStartup.registerChrome(manifestURI, [
    ["content", "myplugin", `${rootURI}chrome/content/`],
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

You can now access resources using the `chrome://myplugin/content/` URI. For example, the file at `${pluginRoot}/chrome/content/script.js` can be accessed as `chrome://myplugin/content/script.js`.
