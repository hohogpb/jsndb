# jsndb

[![npm](https://img.shields.io/npm/v/jsndb)](https://www.npmjs.com/package/jsndb)

a simple json object db

## usage

```sh
npm i jsndb
```

```javascript
const jsndb = require("jsndb");

const db = jsndb("your file path");

// directly set first level child will change to db file
db.foo = "bar";
db.arr = [1, 2, 3];
db.obj = { name: "test", value: 123 };

// now your file is:
// {
//    foo: "bar",
//    arra: [1, 2, 3]
//    obj: {name: "test", value: 123};
// }
//

// set second or 3rd ... level child will not change file
// because it is a deep change
db.arr[0] = "99";
db.obj.value = 456;

// !!! now your file is not change

// to make change to file, you need call save
db.save();

// now your file is:
// {
//    foo: "bar",
//    arra: [99 2, 3],
//    obj: {name: "test", value: 456};
// }
```
