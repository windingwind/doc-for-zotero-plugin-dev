# File I/O

Zotero provides a set of APIs for file I/O operations in `Zotero.File`. Plugins can also use [IOUtils](https://firefox-source-docs.mozilla.org/dom/ioutils_migration.html) and [PathUtils](https://searchfox.org/mozilla-esr115/source/dom/chrome-webidl/PathUtils.webidl) for the operations that are not provided by `Zotero.File`.

## Reading file

```javascript
const path = "/Users/user/Desktop/data.json";
const data = await Zotero.File.getContentsAsync(path);
Zotero.debug(data);
```

## Writing file

```javascript
const path = "/Users/user/Desktop/file.txt";
const data = "This is some text.";
await Zotero.File.putContentsAsync(path, data);
```

## Renaming file

```javascript
const oldPath = "/Users/user/Desktop/old.txt";
const newPath = "/Users/user/Desktop/new.txt";
await Zotero.File.rename(oldPath, newPath);
```

## Removing file

```javascript
const path = "/Users/user/Desktop/file.txt";
await Zotero.File.removeIfExists(path);
```

## Iterating directory

```javascript
const dirPath = "/Users/user/Desktop";
await Zotero.File.iterateDirectory(dirPath, (entry) => {
  Zotero.debug(entry.name);
});
```

## Picking File or Directory

First, you need to import the `FilePicker` class:

```javascript
const { FilePicker } = ChromeUtils.import(
  "chrome://zotero/content/modules/filePicker.jsm",
);
```

Then, you can use the `FilePicker` class to pick a file or directory.

Pick a directory:

```javascript
const fp = new FilePicker();
const defaultPath = "/Users/user/Desktop";
if (defaultPath) {
  fp.displayDirectory = defaultPath;
}
fp.init(Zotero.getMainWindow(), "Select Directory", fp.modeGetFolder);
fp.appendFilters(fp.filterAll);
const rv = await fp.show();

if (rv === fp.returnOK) {
  const path = PathUtils.normalize(fp.file);
  if (defaultPath === path) {
    Zotero.debug("Same directory selected");
  } else {
    Zotero.debug(`Selected directory: ${path}`);
  }
}
```

Pick a file (open):

```javascript
const fp = new FilePicker();
fp.init(Zotero.getMainWindow(), "Select File", fp.modeOpen);
// Allow `*.*` files
fp.appendFilters(fp.filterAll);
// Allow only `*.txt` files
fp.appendFilter("TXT files", "*.txt");
const rv = await fp.show();

if (rv === fp.returnOK || rv === fp.returnReplace) {
  const inputFile = Zotero.File.pathToFile(fp.file);
  const content = await Zotero.File.getContentsAsync(inputFile);
  Zotero.debug(content);
}
```

Pick a file (save):

```javascript
const fp = new FilePicker();
fp.init(Zotero.getMainWindow(), "Save File", fp.modeSave);
// Allow `*.*` files
fp.appendFilters(fp.filterAll);
// Allow only `*.txt` files
fp.appendFilter("TXT files", "*.txt");
const rv = await fp.show();

if (rv === fp.returnOK || rv === fp.returnReplace) {
  const outputFile = Zotero.File.pathToFile(fp.file);
  await Zotero.File.putContentsAsync(outputFile, "Hello, World!");
}
```
