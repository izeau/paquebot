'use strict';

const track = (db, type, name) => {
  db.run(`
    insert into stats (type, name)
    values ($type, $name)
    on conflict (type, name)
    do update set
      hits = hits + 1
  `, {
    $type: type,
    $name: name,
  }, (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = { track };
