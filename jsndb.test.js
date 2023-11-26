const fs = require("fs");
const jsndb = require("./jsndb");

function deleteFile(filepath) {
  try {
    fs.unlinkSync(filepath);
  } catch (error) {}
}

test("basic usage", () => {
  const db = jsndb("testcache/db");
  db.a = 100;
  db.b = "nba";
  db.c = { name: "mj", num: 23 };

  const file = JSON.parse(fs.readFileSync("testcache/db"));
  expect(file.a).toBe(100);
  expect(file.b).toBe("nba");
  expect(file.c.name).toBe("mj");
  expect(file.c.num).toBe(23);
});

test("set default value", () => {
  deleteFile("testcache/defaultvalue.db");

  const db = jsndb("testcache/test.defaultvalue.db", { name: "mj" });
  expect(db.name).toBe("mj");
});
