const db = require('../db/index');

async function getCars() {
  const { rows } = await db.query('SELECT * from cars;');
  return {
    data: rows,
    code: 200,
  };
}

async function changeStatusCar(id, data) {
  try {
    const { rows } = await db.query('SELECT * from cars where id = $1', [id]);
    if (rows.length === 0) {
      return {
        data: 'Car not found',
        code: 404,
      };
    }
    const props = [];
    // eslint-disable-next-line guard-for-in
    for (const prop in data) props.push(`${prop} = '${data[prop]}'`);
    const cmd = `UPDATE cars set ${props.join(',')} where id = $1`;
    await db.query(cmd, [id]);
    return {
      data: `Car with the id ${id} was updated.`,
      code: 200,
    };
  } catch (err) {
    return {
      data: `Error => ${err.message}`,
      code: 500,
    };
  }
}

async function deleteCar(id) {
  const { rows } = await db.query('SELECT * from cars where id = $1', [id]);
  if (rows.length === 0) {
    return {
      data: 'Car not found.',
      code: 404,
    };
  }
  await db.query('DELETE from cars where id = $1', [id]);
  return {
    data: `Car with the id ${id} was deleted.`,
    code: 200,
  };
}

module.exports = { getCars, changeStatusCar, deleteCar };
