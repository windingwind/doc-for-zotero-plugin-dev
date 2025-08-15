## Classes

<dl>
<dt><a href="#Reader">Reader</a></dt>
<dd><p>Reader class for managing reader tabs and windows</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#Zotero">Zotero</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ReaderEventType">ReaderEventType</a> : <code>&quot;renderTextSelectionPopup&quot;</code> | <code>&quot;renderSidebarAnnotationHeader&quot;</code> | <code>&quot;renderToolbar&quot;</code> | <code>&quot;createColorContextMenu&quot;</code> | <code>&quot;createViewContextMenu&quot;</code> | <code>&quot;createAnnotationContextMenu&quot;</code> | <code>&quot;createThumbnailContextMenu&quot;</code> | <code>&quot;createSelectorContextMenu&quot;</code></dt>
<dd></dd>
<dt><a href="#ReaderEvent">ReaderEvent</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ReaderEventHandler">ReaderEventHandler</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Reader"></a>

## Reader

Reader class for managing reader tabs and windows

**Kind**: global class

- [Reader](#Reader)
  - [.registerEventListener(type, handler, [pluginID])](#Reader+registerEventListener) ⇒ <code>void</code>
  - [.unregisterEventListener(type, handler)](#Reader+unregisterEventListener) ⇒ <code>void</code>
  - [.triggerAnnotationsImportCheck(itemID)](#Reader+triggerAnnotationsImportCheck) ⇒ <code>Promise</code>

<a name="Reader+registerEventListener"></a>

### reader.registerEventListener(type, handler, [pluginID]) ⇒ <code>void</code>

**Kind**: instance method of [<code>Reader</code>](#Reader)

| Param      | Type                                                   | Description   |
| ---------- | ------------------------------------------------------ | ------------- |
| type       | [<code>ReaderEventType</code>](#ReaderEventType)       | Event type    |
| handler    | [<code>ReaderEventHandler</code>](#ReaderEventHandler) | Event handler |
| [pluginID] | <code>string</code>                                    | Plugin ID     |

**Example**  
Inject DOM nodes to reader UI parts:

- renderTextSelectionPopup
- renderSidebarAnnotationHeader
- renderToolbar

```javascript
Zotero.Reader.registerEventListener(
  "renderTextSelectionPopup",
  (event) => {
    const { reader, doc, params, append } = event;
    const container = doc.createElement("div");
    container.append("Loading…");
    append(container);
    setTimeout(
      () =>
        container.replaceChildren(`Translated text: ${params.annotation.text}`),
      1000,
    );
  },
  "my-plugin@my-namespace.com",
);
```

**Example**  
Add options to context menus:

- createColorContextMenu
- createViewContextMenu
- createAnnotationContextMenu
- createThumbnailContextMenu
- createSelectorContextMenu

```javascript
Zotero.Reader.registerEventListener(
  "createAnnotationContextMenu",
  (event) => {
    const { reader, params, append } = event;
    append({
      label: "Test",
      onCommand() {
        reader._iframeWindow.alert(
          `Selected annotations: ${params.ids.join(", ")}`,
        );
      },
    });
  },
  "my-plugin@my-namespace.com",
);
```

<a name="Reader+unregisterEventListener"></a>

### reader.unregisterEventListener(type, handler) ⇒ <code>void</code>

**Kind**: instance method of [<code>Reader</code>](#Reader)

| Param   | Type                                                   | Description   |
| ------- | ------------------------------------------------------ | ------------- |
| type    | [<code>ReaderEventType</code>](#ReaderEventType)       | Event type    |
| handler | [<code>ReaderEventHandler</code>](#ReaderEventHandler) | Event handler |

<a name="Reader+triggerAnnotationsImportCheck"></a>

### reader.triggerAnnotationsImportCheck(itemID) ⇒ <code>Promise</code>

Trigger annotations import

**Kind**: instance method of [<code>Reader</code>](#Reader)

| Param  | Type                 | Description        |
| ------ | -------------------- | ------------------ |
| itemID | <code>Integer</code> | Attachment item id |

<a name="Zotero"></a>

## Zotero : <code>object</code>

**Kind**: global namespace  
<a name="Zotero.Reader"></a>

### Zotero.Reader : [<code>Reader</code>](#Reader)

**Kind**: static property of [<code>Zotero</code>](#Zotero)  
<a name="ReaderEventType"></a>

## ReaderEventType : <code>&quot;renderTextSelectionPopup&quot;</code> \| <code>&quot;renderSidebarAnnotationHeader&quot;</code> \| <code>&quot;renderToolbar&quot;</code> \| <code>&quot;createColorContextMenu&quot;</code> \| <code>&quot;createViewContextMenu&quot;</code> \| <code>&quot;createAnnotationContextMenu&quot;</code> \| <code>&quot;createThumbnailContextMenu&quot;</code> \| <code>&quot;createSelectorContextMenu&quot;</code>

**Kind**: global typedef  
<a name="ReaderEvent"></a>

## ReaderEvent : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name   | Type                        | Description      |
| ------ | --------------------------- | ---------------- |
| reader | <code>ReaderInstance</code> | Reader instance  |
| doc    | <code>Document</code>       | Document         |
| params | <code>Object</code>         | Event parameters |
| append | <code>function</code>       | Append function  |

<a name="ReaderEventHandler"></a>

## ReaderEventHandler ⇒ <code>void</code>

**Kind**: global typedef

| Param | Type                                     | Description |
| ----- | ---------------------------------------- | ----------- |
| event | [<code>ReaderEvent</code>](#ReaderEvent) | Event       |
