const mongoose = require('mongoose')
const binanceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Binance', binanceSchema);