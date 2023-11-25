const fs = require("fs");

function jsndb(dbPath) {
  let target = {};

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

  load();

  const p = new Proxy(target, handler);
  return p;
}

module.exports = jsndb;
