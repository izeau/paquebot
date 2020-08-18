'use strict';

const panic = ({ db }) => exception => {
  db.close();
  process.stderr.write(exception.stack);
  process.exit(1);
};

module.exports = panic;
