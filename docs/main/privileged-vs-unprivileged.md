# Privileged vs Unprivileged: Browser Window, HTML Window, and Sandbox

In Zotero, different scopes exist for running code, with each scope having distinct privileges and access to specific APIs.

> ❗️ Be mindful of scope when running code, as some APIs are only accessible in specific scopes.
>
> Zotero is NOT a NodeJS environment; plugins cannot use NodeJS APIs or dependencies designed for NodeJS.

## Privileged vs. Unprivileged

Similar to Firefox, Zotero inherits a layered security model, with different privilege levels that have specific security principals and API access.

> 🔗 For more details about the security model, see [Script Security](https://firefox-source-docs.mozilla.org/dom/scriptSecurity/index.html#script-security)

For security reasons, accessing an object in a lower-privileged scope from a higher-privileged one (e.g., content in an HTML window from the plugin's sandbox) may yield unexpected results, due to "Xray vision."

For example, if you try to access the attribute attached to the `window` object in the HTML window, you may get an undefined value.

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

## Browser Window

An XHTML window that runs in privileged mode, with full access to Zotero and browser APIs. In Zotero, it's used for most of the Zotero windows, like the main and preferences windows. Key characteristics:

- Limited access to standard HTML elements (e.g., `document.body` may not exist in some XHTML windows).
- Access to privileged APIs (e.g., `ChromeUtils`, `Services`, `Zotero`).

> ❗️ Missing global variables is the major cause that some third-party libraries designed for the web cannot work in the browser window.

## HTML Window

An unprivileged HTML window with limited/no access to Zotero APIs or browser APIs. In Zotero, it's mainly used in iframes like the note editor and reader.

In an HTML iframe, use `window.postMessage()` to communicate with the parent window when accessing privileged APIs.

## Sandbox

A secure environment that can run code with different privilege levels. Plugins operate in a privileged sandbox, similar to a worker scope but with privileged API access. Key characteristics:

- Can have access to privileged APIs.
- Global variables, such as `Zotero`, `ChromeUtils`, `Services`, `ChromeWorker`, `Localization`, `IOUtils`, `PathUtils`, etc.

> ❓ **Differences between browser window and sandbox scopes**:
>
> - Both can access privileged APIs.
> - The main window has window-specific APIs or variables (`window`, `document`).
> - Global variables are different. For example, `Zotero` is available in both scopes, but `ZoteroPane` is only available in the main window scope, as it is dependent on the DOM of the main window.
> - The main window scope is recycled on window close, while the sandbox remains until the plugin is unloaded.
