# Menu

## Menu Bar

Zotero's main window has a menu bar containing various menus, such as `File`, `Edit`, and `Tools`. Plugins can add their own menu items to this menu bar to offer additional functionality to users.

The main menu bar is defined by the `menubar#main-menubar` element in `zoteroPane.xhtml`, which is the XHTML file for Zotero's main window.

To add a menu item to the menu bar, plugins can insert menu items or menu popup elements in the `onMainWindowLoad` hook.

Here's an example of how to add a new menu item to the `Tools` menu:

```javascript
// In the plugin's bootstrap.js

function onMainWindowLoad({ window }) {
  // ...

  const document = window.document;

  // Insert FTL file into the document
  window.MozXULElement.insertFTLIfNeeded("myplugin-menu.ftl");
  // Get the Tools menu popup
  const toolsMenuPopup = document.querySelector("#menu_ToolsPopup");
  // Create a new menu item
  const menuItem = document.createXULElement("menuitem");
  // Set the label of the menu item
  // The `label` is localized using the FTL file
  menuItem.dataset.l10nId = "myplugin-menu-item";
  menuItem.addEventListener("command", () => {
    window.alert("My Menu Item is clicked");
  });
  // Insert the menu item to the Tools menu
  toolsMenuPopup.appendChild(menuItem);

  // ...
}
```

In the `myplugin-menu.ftl` file, which is used for localization, add the following:

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

## Library Context Menu

The library context menu appears when you right-click on an item or collection in the library pane. Plugins can add their own options to this menu, enabling custom actions that apply specifically to items or collections.

Similar to adding items to the menu bar, plugins can add menu items to the library context menu by inserting menu items or popups in the `onMainWindowLoad` function, which is called when Zotero's main window is loaded.

Below is an example of how to add a new menu item to the library item context menu:

```javascript
// In the plugin's bootstrap.js

function onMainWindowLoad({ window }) {
  const document = window.document;

  // Get the item context menu popup
  const itemMenuPopup = document.querySelector("#zotero-itemmenu");

  // Create a new menu item
  const menuItem = document.createXULElement("menuitem");

  // Set the label of the menu item
  menuItem.setAttribute("label", "Custom Item Action");

  // Add a click event listener to handle the action
  menuItem.addEventListener("command", () => {
    window.alert("Custom Item Action clicked!");
  });

  // Insert the menu item into the item context menu
  itemMenuPopup.appendChild(menuItem);

  // Only show the menu item for regular items
  itemMenuPopup.addEventListener("popupshowing", () => {
    menuItem.hidden = Zotero.getActiveZoteroPane()
      .getSelectedItems()
      .some((item) => {
        return !item.isRegularItem();
      });
  });
}
```

The full list of the query selectors for the library context menu is as follows:

- `#zotero-collectionmenu`: for the collection context menu.
- `#zotero-itemmenu`: for the item context menu.

## Reader Context Menu

The reader context menu appears when you right-click on the reader. This menu can be customized to provide additional functionality, such as adding actions for annotations or specific text selections within documents.

Unlike the menu bar and library context menus, the reader context menu is not defined in the main window's XHTML file. Instead, it is dynamically created by the reader instance. To add menu items to this context menu, you can use the `Zotero.Reader.registerEventListener` method in the `startup` function. The event listener you register will automatically be removed when the plugin is unloaded.

Below is an example of how to add a menu item to the reader annotation context menu:

```javascript
// In the plugin's code

function startup() {
  // ...

  // Register the event listener for the reader annotation context menu
  Zotero.Reader.registerEventListener(
    "createAnnotationContextMenu",
    (event) => {
      const { reader, params, append } = event;
      // Create a new menu item
      append({
        label: "Test",
        onCommand() {
          reader._iframeWindow.alert(
            `Selected annotations: ${params.ids.join(", ")}`,
          );
        },
      });
    },
    "myplugin@mydomain.com", // Replace with your plugin ID
  );

  // ...
}
```

The following context menu types are supported for the `registerEventListener` method:

- `createColorContextMenu`: triggered when the top toolbar's color picker menu is created
- `createViewContextMenu`: triggered when the viewer's right-click menu is created
- `createAnnotationContextMenu`: triggered when the left sidebar's annotation right-click menu is created
- `createThumbnailContextMenu`: triggered when the left sidebar's thumbnail right-click menu is created
- `createSelectorContextMenu`: triggered when the left sidebar's tag selector right-click menu is created

For more information about the API, refer to the [source code](https://github.com/zotero/blob/main/chrome/content/zotero/xpcom/reader.js).
