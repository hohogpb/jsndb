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

// now your file is:
// {
//    foo: "bar",
//    arra: [1, 2, 3]
// }
//

// set second or 3rd ... level child will not change file
db.arr[0] = "99";

// now your file is not change

// to make change to file, you need call save
db.save();

// now your file is:
// {
//    foo: "bar",
//    arra: [99 2, 3]
// }
```
