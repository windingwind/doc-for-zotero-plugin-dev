# Plugin Update

When you release new versions of your plugin, you can using a [Mozilla-style JSON update manifest](https://extensionworkshop.com/documentation/manage/updating-your-extension/) to allow Zotero to check for new versions and install updates automatically.

The update manifests are set up to demonstrate upgrading across all versions, but normally a plugin would point to a single update manifest that was updated as new versions were available.

The update manifest JSON is not included in the plugin XPI file. It should be hosted online, and the URL should be specified in the plugin's `update_url` field in the `manifest.json` file of the plugin.

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
