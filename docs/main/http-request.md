# HTTP Request

Zotero provides a set of APIs for making HTTP requests. The `Zotero.HTTP` object is used to make HTTP requests. It has the following important methods:

- `request(method, url, options)`: makes an HTTP request.

## Making a GET Request

```javascript
const url = "https://jsonplaceholder.typicode.com/posts/1";
const req = await Zotero.HTTP.request("GET", url);
Zotero.debug(req.status); // 200
Zotero.debug(req.statusText); // OK
Zotero.debug(req.response); // string
```

If you want to get the JSON response, pass the `responseType` option as `json`.

```javascript
const url = "https://jsonplaceholder.typicode.com/posts/1";
const req = await Zotero.HTTP.request("GET", url, { responseType: "json" });
Zotero.debug(req.response); // object
```

## Making a POST Request

```javascript
const url = "https://jsonplaceholder.typicode.com/posts";
const data = {
  title: "foo",
  body: "bar",
  userId: 1,
};
const req = await Zotero.HTTP.request("POST", url, {
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
