const fs = require("fs");
const path = require("path");

function jsndb(dbPath, defaultValue = undefined) {
  let target = {};

  if (defaultValue) {
    if (typeof defaultValue != "object")
      throw new Error("default value can only be object");

    target = defaultValue;

    if (!fs.existsSync(dbPath)) {
      save();
    }
  }

  const builtinFn = {
    save,
  };

  const handler = {
    get(obj, prop) {
      return builtinFn[prop] || obj[prop];
    },

    set(obj, prop, value) {
      if (builtinFn[prop]) return false;

      obj[prop] = value;

      save();
      return true;
    },
  };

  function load() {
    try {
      const doc = fs.readFileSync(dbPath);
      target = JSON.parse(doc);
    } catch (error) {}
  }

  function save() {
    fs.writeFileSync(dbPath, JSON.stringify(target, null, 2));
  }

  function dirCheck() {
    const directoryPath = path.dirname(dbPath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  dirCheck();

  load();

  const p = new Proxy(target, handler);
  return p;
}

module.exports = jsndb;
