const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");
const binanceController = require("../controllers/binance.controller");
const varifyToken = require("../middleware/verifyToken ");

Router.route("/binances")
  .get(varifyToken, binanceController.getAllbinances)
  .post([
    body('price').isNumeric().withMessage('price must be number'),
    body('description').notEmpty().withMessage('description must be writen')
  ],varifyToken, binanceController.addBinance);



Router.route('/binances/:binanceId').delete(varifyToken, binanceController.deleteBinance)
.put(varifyToken,binanceController.updateBinance)
module.exports = Router;
