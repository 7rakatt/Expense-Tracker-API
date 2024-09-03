const express =require( 'express') 
const mongoose =require( 'mongoose')
const dotenv =require( 'dotenv')
  dotenv.config();
const app = express()
app.use(express.json())
const httpstatustxt = require( "./utils/httpstatustxt");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('connected to db');
})

const userRoute = require('./routes/users.router')
app.use("/", userRoute);

const binanceRoute = require('./routes/binance.router')
app.use("/", binanceRoute);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpstatustxt.ERROR,
    message: "this resource is not avilable",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpstatustxt.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log('listening...');
})