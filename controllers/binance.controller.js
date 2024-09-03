const Binance = require("../models/binance.model");
const httpstatustxt = require("../utils/httpstatustxt");
const asyncWrapper = require("../middleware/asyncWrapper");
const { validationResult } = require("express-validator");
const appError = require("../utils/appError");
const getDateRange = require('../utils/getDateRange')


const getAllbinances = asyncWrapper(async (req, res) => {
  const { filter } = req.query;
  if (!filter) {
    const binances = await Binance.find({}, { __v: false });
    return res.status(200).send({ status: httpstatustxt.SUCCESS, data: { binances } });
  }
   const { startDate, endDate } = getDateRange(filter);

   const filteredBinances = await Binance.find({
     date: {
       $gte: startDate,
       $lte: endDate,
     },
   });

   res.status(200).send({ status: httpstatustxt.SUCCESS, data: { filteredBinances } });
});

const addBinance = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
   if (!errors.isEmpty()) {
     const error = appError.creat(errors.array(), 400, httpstatustxt.FAIL);
     return next(error);
   }
  const newBinance = new Binance(req.body);
  await newBinance.save()
  res
    .status(201)
    .json({ status: httpstatustxt.SUCCESS, data: { newBinance } });
  
})

//delete
const deleteBinance = asyncWrapper(async (req, res, next) => {
  await Binance.findByIdAndDelete(req.params.binanceId);
  res.status(200).json({ status: httpstatustxt.SUCCESS, data:  null  });
})

//update
const updateBinance = asyncWrapper(async (req, res, next) => {
  const datatoUpdate = req.body;
  const updatedBinance = await Binance.findByIdAndUpdate(req.params.binanceId, datatoUpdate, { new: true });
  res.status(200).json({ status: httpstatustxt.SUCCESS, data: {updatedBinance} });
})

module.exports = {
  updateBinance,
  deleteBinance,
  addBinance,
  getAllbinances,
};