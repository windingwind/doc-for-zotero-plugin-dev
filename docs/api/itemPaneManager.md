## Objects

<dl>
<dt><a href="#Zotero">Zotero</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SectionIcon">SectionIcon</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionL10n">SectionL10n</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionButton">SectionButton</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionBasicHookArgs">SectionBasicHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionUIHookArgs">SectionUIHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionHookArgs">SectionHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionInitHookArgs">SectionInitHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionEventHookArgs">SectionEventHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SectionInitHook">SectionInitHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SectionBasicHook">SectionBasicHook</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#SectionItemChangeHook">SectionItemChangeHook</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#SectionRenderHook">SectionRenderHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SectionAsyncRenderHook">SectionAsyncRenderHook</a> ⇒ <code>void</code> | <code>Promise.&lt;void&gt;</code></dt>
<dd></dd>
<dt><a href="#SectionToggleHook">SectionToggleHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SectionEventHook">SectionEventHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetSectionL10nArgs">SetSectionL10nArgs</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetEnabled">SetEnabled</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetSectionSummary">SetSectionSummary</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetSectionButtonStatus">SetSectionButtonStatus</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SectionRefresh">SectionRefresh</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd></dd>
<dt><a href="#InfoRowL10n">InfoRowL10n</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InfoRowPosition">InfoRowPosition</a> : <code>&quot;start&quot;</code> | <code>&quot;afterCreators&quot;</code> | <code>&quot;end&quot;</code></dt>
<dd><p>Position of the row.</p>
</dd>
<dt><a href="#InfoRowGetDataHookArgs">InfoRowGetDataHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InfoRowSetDataHookArgs">InfoRowSetDataHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InfoRowItemChangeHookArgs">InfoRowItemChangeHookArgs</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InfoRowGetDataHook">InfoRowGetDataHook</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#InfoRowSetDataHook">InfoRowSetDataHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#InfoRowItemChangeHook">InfoRowItemChangeHook</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetInfoRowEnabled">SetInfoRowEnabled</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SetInfoRowEditable">SetInfoRowEditable</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Zotero"></a>

## Zotero : <code>object</code>

**Kind**: global namespace

- [Zotero](#Zotero) : <code>object</code>
  - [.ItemPaneManager](#Zotero.ItemPaneManager)
    - [.registerSection(options)](#Zotero.ItemPaneManager.registerSection) ⇒ <code>string</code> \| <code>false</code>
    - [.unregisterSection(paneID)](#Zotero.ItemPaneManager.unregisterSection) ⇒ <code>boolean</code>
    - [.registerInfoRow(options)](#Zotero.ItemPaneManager.registerInfoRow) ⇒ <code>string</code> \| <code>false</code>
    - [.unregisterInfoRow(rowID)](#Zotero.ItemPaneManager.unregisterInfoRow) ⇒ <code>boolean</code>
    - [.refreshInfoRow(rowID)](#Zotero.ItemPaneManager.refreshInfoRow) ⇒ <code>void</code>

<a name="Zotero.ItemPaneManager"></a>

### Zotero.ItemPaneManager

Manages item pane APIs.

**Kind**: static property of [<code>Zotero</code>](#Zotero)

- [.ItemPaneManager](#Zotero.ItemPaneManager)
  - [.registerSection(options)](#Zotero.ItemPaneManager.registerSection) ⇒ <code>string</code> \| <code>false</code>
  - [.unregisterSection(paneID)](#Zotero.ItemPaneManager.unregisterSection) ⇒ <code>boolean</code>
  - [.registerInfoRow(options)](#Zotero.ItemPaneManager.registerInfoRow) ⇒ <code>string</code> \| <code>false</code>
  - [.unregisterInfoRow(rowID)](#Zotero.ItemPaneManager.unregisterInfoRow) ⇒ <code>boolean</code>
  - [.refreshInfoRow(rowID)](#Zotero.ItemPaneManager.refreshInfoRow) ⇒ <code>void</code>

<a name="Zotero.ItemPaneManager.registerSection"></a>

#### ItemPaneManager.registerSection(options) ⇒ <code>string</code> \| <code>false</code>

Register a custom item pane section.

**Kind**: static method of [<code>ItemPaneManager</code>](#Zotero.ItemPaneManager)  
**Returns**: <code>string</code> \| <code>false</code> - - The registered pane ID or false if failed.

| Param                    | Type                                                                                 | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                  | <code>Object</code>                                                                  | Section options.                                                                                                                                                                                                                            |
| options.paneID           | <code>string</code>                                                                  | Unique pane ID.                                                                                                                                                                                                                             |
| options.pluginID         | <code>string</code>                                                                  | Set plugin ID to auto-remove section when the plugin is disabled or removed.                                                                                                                                                                |
| options.header           | [<code>SectionL10n</code>](#SectionL10n) \| [<code>SectionIcon</code>](#SectionIcon) | Header options. Icon should be 16\*16 and `label` need to be localized.                                                                                                                                                                     |
| options.sidenav          | [<code>SectionL10n</code>](#SectionL10n) \| [<code>SectionIcon</code>](#SectionIcon) | Sidenav options. Icon should be 20\*20 and `tooltiptext` need to be localized.                                                                                                                                                              |
| [options.bodyXHTML]      | <code>string</code>                                                                  | Pane body's innerHTML, defaults to XUL namespace.                                                                                                                                                                                           |
| [options.onInit]         | [<code>SectionInitHook</code>](#SectionInitHook)                                     | Lifecycle hook called when section is initialized. Do: 1. Initialize data if necessary 2. Set up hooks, e.g. notifier callback Don't: 1. Render/refresh UI                                                                                  |
| [options.onDestroy]      | [<code>SectionBasicHook</code>](#SectionBasicHook)                                   | Lifecycle hook called when section is destroyed. Do: 1. Remove data and release resource 2. Remove hooks, e.g. notifier callback Don't: 1. Render/refresh UI                                                                                |
| [options.onItemChange]   | [<code>SectionItemChangeHook</code>](#SectionItemChangeHook)                         | Lifecycle hook called when the section's target item is changed. Do: 1. Update data (no need to render or refresh); 2. Update the section enabled state with `props.setEnabled`. Don't: 1. Render/refresh UI                                |
| options.onRender         | [<code>SectionRenderHook</code>](#SectionRenderHook)                                 | Lifecycle hook called for initial render. Cannot be async. Create elements and append them to `props.body`. If the rendering is slow, you should make the bottleneck async and move it to `onAsyncRender`.                                  |
| [options.onAsyncRender]  | [<code>SectionAsyncRenderHook</code>](#SectionAsyncRenderHook)                       | Lifecycle hook for asynchronous rendering. The best practice to time-consuming rendering with runtime decided section height is: 1. Compute height and create a box in sync `onRender`; 2. Render actual contents in async `onAsyncRender`. |
| [options.onToggle]       | [<code>SectionToggleHook</code>](#SectionToggleHook)                                 | Called when section is toggled.                                                                                                                                                                                                             |
| [options.sectionButtons] | [<code>Array.&lt;SectionButton&gt;</code>](#SectionButton)                           | Section button options.                                                                                                                                                                                                                     |

**Example**

```javascript
Zotero.ItemPaneManager.registerSection({
  paneID: "my-plugin-pane",
  pluginID: "my-plugin@my-namespace.com",
  header: {
    l10nID: "my-plugin-pane-header", // Must inject the corresponding `ftl` file
    icon: "chrome://my-plugin/content/icon16.svg",
  },
  sidenav: {
    l10nID: "my-plugin-pane-sidenav", // Must inject the corresponding `ftl` file
    icon: "chrome://my-plugin/content/icon20.svg",
  },
  onInit: ({ paneID, doc, body }) => {
    // Initialize data
    Zotero.debug("Section initialized");
  },
  onDestroy: ({ paneID, doc, body }) => {
    // Release resource
    Zotero.debug("Section destroyed");
  },
  onItemChange: ({
    paneID,
    doc,
    body,
    item,
    tabType,
    editable,
    setEnabled,
  }) => {
    // In this example, the section is enabled only for regular items
    setEnabled(item.isRegularItem());
  },
  onRender: ({ doc, body, item }) => {
    // Create elements and append them to `body`
    const div = doc.createElement("div");
    div.classList.add("my-plugin-section");
    div.textContent = item.getField("title");
    body.appendChild(div);
  },
  onAsyncRender: async ({ body }) => {
    // Put time-consuming rendering here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    body.querySelector(".my-plugin-section")?.style.setProperty("color", "red");
  },
  onToggle: ({ paneID, doc, body, item, tabType, editable, setEnabled }) => {
    // Handle section toggle
    Zotero.debug("Section toggled");
  },
  sectionButtons: [
    // Section button will appear in the header
  ],
});
```

<a name="Zotero.ItemPaneManager.unregisterSection"></a>

#### ItemPaneManager.unregisterSection(paneID) ⇒ <code>boolean</code>

Unregister a custom item pane section.

**Kind**: static method of [<code>ItemPaneManager</code>](#Zotero.ItemPaneManager)  
**Returns**: <code>boolean</code> - - True if the section is successfully unregistered, false if the paneID is not found.

| Param  | Type                | Description                                                             |
| ------ | ------------------- | ----------------------------------------------------------------------- |
| paneID | <code>string</code> | Pane ID to unregister. This is the value returned by `registerSection`. |

<a name="Zotero.ItemPaneManager.registerInfoRow"></a>

#### ItemPaneManager.registerInfoRow(options) ⇒ <code>string</code> \| <code>false</code>

Register a custom item pane info section row.

**Kind**: static method of [<code>ItemPaneManager</code>](#Zotero.ItemPaneManager)  
**Returns**: <code>string</code> \| <code>false</code> - - The registered row ID or false if failed.

| Param                  | Type                                                         | Description                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                | <code>Object</code>                                          | Row options.                                                                                                                                                |
| options.rowID          | <code>string</code>                                          | Unique row ID.                                                                                                                                              |
| options.pluginID       | <code>string</code>                                          | Set plugin ID to auto-remove row when the plugin is disabled or removed.                                                                                    |
| options.label          | [<code>InfoRowL10n</code>](#InfoRowL10n)                     | Label options. `label` need to be localized.                                                                                                                |
| [options.position]     | [<code>InfoRowPosition</code>](#InfoRowPosition)             | Position of the row.                                                                                                                                        |
| [options.multiline]    | <code>boolean</code>                                         | Whether the row is multiline.                                                                                                                               |
| [options.nowrap]       | <code>boolean</code>                                         | Whether the row is nowrap.                                                                                                                                  |
| [options.editable]     | <code>boolean</code>                                         | Whether the row is editable.                                                                                                                                |
| options.onGetData      | [<code>InfoRowGetDataHook</code>](#InfoRowGetDataHook)       | Lifecycle hook for getting row data for rendering. This is called when the row is rendered or refreshed.                                                    |
| [options.onSetData]    | [<code>InfoRowSetDataHook</code>](#InfoRowSetDataHook)       | Lifecycle hook for saving row data changes after editing. Do: 1. Save the new value of the row Don't: 1. Render/refresh UI 2. Change the value in this hook |
| [options.onItemChange] | [<code>InfoRowItemChangeHook</code>](#InfoRowItemChangeHook) | Lifecycle hook for target item changes. Do: 1. Update the row attribute, e.g. enabled, editable Don't: 1. Render/refresh UI                                 |

**Example**

```javascript
Zotero.ItemPaneManager.registerInfoRow({
  rowID: "my-plugin-row",
  pluginID: "my-plugin@my-namespace.com",
  label: {
    l10nID: "my-plugin-row-label", // Must inject the corresponding `ftl` file
  },
  position: "afterCreators",
  multiline: true,
  nowrap: false,
  editable: true,
  onGetData: ({ rowID, item, tabType, editable }) => {
    return item.getField("title").toUpperCase();
  },
  onSetData: ({ rowID, item, tabType, editable, value }) => {
    Zotero.debug("Info row data changed:", value);
  },
  onItemChange: ({
    rowID,
    item,
    tabType,
    editable,
    setEnabled,
    setEditable,
  }) => {
    // In this example, the row is enabled only for library tab
    setEnabled(tabType === "library");
  },
});
```

<a name="Zotero.ItemPaneManager.unregisterInfoRow"></a>

#### ItemPaneManager.unregisterInfoRow(rowID) ⇒ <code>boolean</code>

Unregister a custom item pane info section row.

**Kind**: static method of [<code>ItemPaneManager</code>](#Zotero.ItemPaneManager)  
**Returns**: <code>boolean</code> - - True if the row is successfully unregistered, false if the rowID is not found.

| Param | Type                | Description                                                            |
| ----- | ------------------- | ---------------------------------------------------------------------- |
| rowID | <code>string</code> | Row ID to unregister. This is the value returned by `registerInfoRow`. |

<a name="Zotero.ItemPaneManager.refreshInfoRow"></a>

#### ItemPaneManager.refreshInfoRow(rowID) ⇒ <code>void</code>

Refresh a custom item pane info section row.

**Kind**: static method of [<code>ItemPaneManager</code>](#Zotero.ItemPaneManager)

| Param | Type                | Description                                                         |
| ----- | ------------------- | ------------------------------------------------------------------- |
| rowID | <code>string</code> | Row ID to refresh. This is the value returned by `registerInfoRow`. |

<a name="SectionIcon"></a>

## SectionIcon : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name       | Type                | Description                                    |
| ---------- | ------------------- | ---------------------------------------------- |
| icon       | <code>string</code> | Icon URI.                                      |
| [darkIcon] | <code>string</code> | Icon URI in dark mode. If not set, use `icon`. |

<a name="SectionL10n"></a>

## SectionL10n : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name       | Type                | Description                                            |
| ---------- | ------------------- | ------------------------------------------------------ |
| l10nID     | <code>string</code> | data-l10n-id for localization of section header label. |
| [l10nArgs] | <code>string</code> | data-l10n-args for localization.                       |

<a name="SectionButton"></a>

## SectionButton : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name       | Type                                               | Description                                           |
| ---------- | -------------------------------------------------- | ----------------------------------------------------- |
| type       | <code>string</code>                                | Button type, must be valid DOMString and without ",". |
| icon       | <code>string</code>                                | Icon URI.                                             |
| [darkIcon] | <code>string</code>                                | Icon URI in dark mode. If not set, use `icon`.        |
| [l10nID]   | <code>string</code>                                | data-l10n-id for localization of button tooltiptext.  |
| onClick    | [<code>SectionEventHook</code>](#SectionEventHook) | Button click callback.                                |

<a name="SectionBasicHookArgs"></a>

## SectionBasicHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name   | Type                        | Description          |
| ------ | --------------------------- | -------------------- |
| paneID | <code>string</code>         | Registered pane id.  |
| doc    | <code>Document</code>       | Document of section. |
| body   | <code>HTMLDivElement</code> | Section body.        |

<a name="SectionUIHookArgs"></a>

## SectionUIHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name                   | Type                                                           | Description                                          |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| item                   | <code>Zotero.Item</code>                                       | Current item.                                        |
| tabType                | <code>string</code>                                            | Current tab type.                                    |
| editable               | <code>boolean</code>                                           | Whether the section is in edit mode.                 |
| setL10nArgs            | [<code>SetSectionL10nArgs</code>](#SetSectionL10nArgs)         | Set l10n args for section header.                    |
| setEnabled             | [<code>SetEnabled</code>](#SetEnabled)                         | Set pane enabled state.                              |
| setSectionSummary      | [<code>SetSectionSummary</code>](#SetSectionSummary)           | Set pane section summary, shown in collapsed header. |
| setSectionButtonStatus | [<code>SetSectionButtonStatus</code>](#SetSectionButtonStatus) | Set pane section button status.                      |

<a name="SectionHookArgs"></a>

## SectionHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name                   | Type                                                           | Description                                          |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| paneID                 | <code>string</code>                                            | Registered pane id.                                  |
| doc                    | <code>Document</code>                                          | Document of section.                                 |
| body                   | <code>HTMLDivElement</code>                                    | Section body.                                        |
| item                   | <code>Zotero.Item</code>                                       | Current item.                                        |
| tabType                | <code>string</code>                                            | Current tab type.                                    |
| editable               | <code>boolean</code>                                           | Whether the section is in edit mode.                 |
| setL10nArgs            | [<code>SetSectionL10nArgs</code>](#SetSectionL10nArgs)         | Set l10n args for section header.                    |
| setEnabled             | [<code>SetEnabled</code>](#SetEnabled)                         | Set pane enabled state.                              |
| setSectionSummary      | [<code>SetSectionSummary</code>](#SetSectionSummary)           | Set pane section summary, shown in collapsed header. |
| setSectionButtonStatus | [<code>SetSectionButtonStatus</code>](#SetSectionButtonStatus) | Set pane section button status.                      |

<a name="SectionInitHookArgs"></a>

## SectionInitHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name                   | Type                                                           | Description                                                                                                                                                                                                           |
| ---------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paneID                 | <code>string</code>                                            | Registered pane id.                                                                                                                                                                                                   |
| doc                    | <code>Document</code>                                          | Document of section.                                                                                                                                                                                                  |
| body                   | <code>HTMLDivElement</code>                                    | Section body.                                                                                                                                                                                                         |
| item                   | <code>Zotero.Item</code>                                       | Current item.                                                                                                                                                                                                         |
| tabType                | <code>string</code>                                            | Current tab type.                                                                                                                                                                                                     |
| editable               | <code>boolean</code>                                           | Whether the section is in edit mode.                                                                                                                                                                                  |
| setL10nArgs            | [<code>SetSectionL10nArgs</code>](#SetSectionL10nArgs)         | Set l10n args for section header.                                                                                                                                                                                     |
| setEnabled             | [<code>SetEnabled</code>](#SetEnabled)                         | Set pane enabled state.                                                                                                                                                                                               |
| setSectionSummary      | [<code>SetSectionSummary</code>](#SetSectionSummary)           | Set pane section summary, shown in collapsed header.                                                                                                                                                                  |
| setSectionButtonStatus | [<code>SetSectionButtonStatus</code>](#SetSectionButtonStatus) | Set pane section button status.                                                                                                                                                                                       |
| refresh                | [<code>SectionRefresh</code>](#SectionRefresh)                 | Refresh the section. A `refresh` is exposed to plugins to allows plugins to refresh the section when necessary, e.g. item modify notifier callback. Note that calling `refresh` during initialization have no effect. |

<a name="SectionEventHookArgs"></a>

## SectionEventHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name                   | Type                                                           | Description                                          |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| paneID                 | <code>string</code>                                            | Registered pane id.                                  |
| doc                    | <code>Document</code>                                          | Document of section.                                 |
| body                   | <code>HTMLDivElement</code>                                    | Section body.                                        |
| item                   | <code>Zotero.Item</code>                                       | Current item.                                        |
| tabType                | <code>string</code>                                            | Current tab type.                                    |
| editable               | <code>boolean</code>                                           | Whether the section is in edit mode.                 |
| setL10nArgs            | [<code>SetSectionL10nArgs</code>](#SetSectionL10nArgs)         | Set l10n args for section header.                    |
| setEnabled             | [<code>SetEnabled</code>](#SetEnabled)                         | Set pane enabled state.                              |
| setSectionSummary      | [<code>SetSectionSummary</code>](#SetSectionSummary)           | Set pane section summary, shown in collapsed header. |
| setSectionButtonStatus | [<code>SetSectionButtonStatus</code>](#SetSectionButtonStatus) | Set pane section button status.                      |
| event                  | <code>Event</code>                                             | Event object.                                        |

<a name="SectionInitHook"></a>

## SectionInitHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                                     | Description                                   |
| ----- | -------------------------------------------------------- | --------------------------------------------- |
| props | [<code>SectionInitHookArgs</code>](#SectionInitHookArgs) | Props provided during section initialization. |

<a name="SectionBasicHook"></a>

## SectionBasicHook : <code>function</code>

**Kind**: global typedef

| Param | Type                                                       | Description           |
| ----- | ---------------------------------------------------------- | --------------------- |
| props | [<code>SectionBasicHookArgs</code>](#SectionBasicHookArgs) | Basic hook arguments. |

<a name="SectionItemChangeHook"></a>

## SectionItemChangeHook ⇒ <code>boolean</code>

**Kind**: global typedef

| Param | Type                                             | Description                      |
| ----- | ------------------------------------------------ | -------------------------------- |
| props | [<code>SectionHookArgs</code>](#SectionHookArgs) | Hook arguments for item changes. |

<a name="SectionRenderHook"></a>

## SectionRenderHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                             | Description                   |
| ----- | ------------------------------------------------ | ----------------------------- |
| props | [<code>SectionHookArgs</code>](#SectionHookArgs) | Hook arguments for rendering. |

<a name="SectionAsyncRenderHook"></a>

## SectionAsyncRenderHook ⇒ <code>void</code> \| <code>Promise.&lt;void&gt;</code>

**Kind**: global typedef

| Param | Type                                             | Description                                |
| ----- | ------------------------------------------------ | ------------------------------------------ |
| props | [<code>SectionHookArgs</code>](#SectionHookArgs) | Hook arguments for asynchronous rendering. |

<a name="SectionToggleHook"></a>

## SectionToggleHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                                       | Description           |
| ----- | ---------------------------------------------------------- | --------------------- |
| props | [<code>SectionEventHookArgs</code>](#SectionEventHookArgs) | Event hook arguments. |

<a name="SectionEventHook"></a>

## SectionEventHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                                       | Description           |
| ----- | ---------------------------------------------------------- | --------------------- |
| props | [<code>SectionEventHookArgs</code>](#SectionEventHookArgs) | Event hook arguments. |

<a name="SetSectionL10nArgs"></a>

## SetSectionL10nArgs ⇒ <code>void</code>

**Kind**: global typedef

| Param    | Type                | Description             |
| -------- | ------------------- | ----------------------- |
| l10nArgs | <code>string</code> | Localization arguments. |

<a name="SetEnabled"></a>

## SetEnabled ⇒ <code>void</code>

**Kind**: global typedef

| Param   | Type                 | Description    |
| ------- | -------------------- | -------------- |
| enabled | <code>boolean</code> | Enabled state. |

<a name="SetSectionSummary"></a>

## SetSectionSummary ⇒ <code>void</code>

**Kind**: global typedef

| Param   | Type                | Description                         |
| ------- | ------------------- | ----------------------------------- |
| summary | <code>string</code> | The summary for the section header. |

<a name="SetSectionButtonStatus"></a>

## SetSectionButtonStatus ⇒ <code>void</code>

**Kind**: global typedef

| Param              | Type                 | Description                     |
| ------------------ | -------------------- | ------------------------------- |
| buttonType         | <code>string</code>  | The button type.                |
| options            | <code>Object</code>  | Options for the button status.  |
| [options.disabled] | <code>boolean</code> | Whether the button is disabled. |
| [options.hidden]   | <code>boolean</code> | Whether the button is hidden.   |

<a name="SectionRefresh"></a>

## SectionRefresh ⇒ <code>Promise.&lt;void&gt;</code>

**Kind**: global typedef  
<a name="InfoRowL10n"></a>

## InfoRowL10n : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name   | Type                | Description                                 |
| ------ | ------------------- | ------------------------------------------- |
| l10nID | <code>string</code> | data-l10n-id for localization of row label. |

<a name="InfoRowPosition"></a>

## InfoRowPosition : <code>&quot;start&quot;</code> \| <code>&quot;afterCreators&quot;</code> \| <code>&quot;end&quot;</code>

Position of the row.

**Kind**: global typedef  
<a name="InfoRowGetDataHookArgs"></a>

## InfoRowGetDataHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name     | Type                     | Description                      |
| -------- | ------------------------ | -------------------------------- |
| rowID    | <code>string</code>      | Row ID.                          |
| item     | <code>Zotero.Item</code> | Current item.                    |
| tabType  | <code>string</code>      | Current tab type.                |
| editable | <code>boolean</code>     | Whether the row is in edit mode. |

<a name="InfoRowSetDataHookArgs"></a>

## InfoRowSetDataHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name     | Type                     | Description                      |
| -------- | ------------------------ | -------------------------------- |
| rowID    | <code>string</code>      | Row ID.                          |
| item     | <code>Zotero.Item</code> | Current item.                    |
| tabType  | <code>string</code>      | Current tab type.                |
| editable | <code>string</code>      | Whether the row is in edit mode. |
| value    | <code>string</code>      | New value.                       |

<a name="InfoRowItemChangeHookArgs"></a>

## InfoRowItemChangeHookArgs : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name        | Type                                                   | Description                      |
| ----------- | ------------------------------------------------------ | -------------------------------- |
| rowID       | <code>string</code>                                    | Row ID.                          |
| item        | <code>Zotero.Item</code>                               | Current item.                    |
| tabType     | <code>string</code>                                    | Current tab type.                |
| editable    | <code>boolean</code>                                   | Whether the row is in edit mode. |
| setEnabled  | [<code>SetInfoRowEnabled</code>](#SetInfoRowEnabled)   | Set row enabled state.           |
| setEditable | [<code>SetInfoRowEditable</code>](#SetInfoRowEditable) | Set row editable state.          |

<a name="InfoRowGetDataHook"></a>

## InfoRowGetDataHook ⇒ <code>string</code>

**Kind**: global typedef  
**Returns**: <code>string</code> - - Row data.

| Param | Type                                                           | Description                      |
| ----- | -------------------------------------------------------------- | -------------------------------- |
| props | [<code>InfoRowGetDataHookArgs</code>](#InfoRowGetDataHookArgs) | Hook arguments for getting data. |

<a name="InfoRowSetDataHook"></a>

## InfoRowSetDataHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                                           | Description                      |
| ----- | -------------------------------------------------------------- | -------------------------------- |
| props | [<code>InfoRowSetDataHookArgs</code>](#InfoRowSetDataHookArgs) | Hook arguments for setting data. |

<a name="InfoRowItemChangeHook"></a>

## InfoRowItemChangeHook ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                                                 | Description                      |
| ----- | -------------------------------------------------------------------- | -------------------------------- |
| props | [<code>InfoRowItemChangeHookArgs</code>](#InfoRowItemChangeHookArgs) | Hook arguments for item changes. |

<a name="SetInfoRowEnabled"></a>

## SetInfoRowEnabled ⇒ <code>void</code>

**Kind**: global typedef

| Param   | Type                 | Description    |
| ------- | -------------------- | -------------- |
| enabled | <code>boolean</code> | Enabled state. |

<a name="SetInfoRowEditable"></a>

## SetInfoRowEditable ⇒ <code>void</code>

**Kind**: global typedef

| Param    | Type                 | Description     |
| -------- | -------------------- | --------------- |
| editable | <code>boolean</code> | Editable state. |
