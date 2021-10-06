const asyncHandler = require('express-async-handler');
const carFunction = require('../model/cars');

const getCars = asyncHandler(async (req, res) => {
  const { code, data } = await carFunction.getCars();
  res.status(code).json(data);
});

module.exports = { getCars };
