const db = require('../db/index');

async function getCars() {
  const { rows } = await db.query('SELECT * from cars;');
  return {
    data: rows,
    code: 200,
  };
}

module.exports = { getCars };
