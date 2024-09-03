const User = require("../models/user.model");
const httpstatustxt = require("../utils/httpstatustxt");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const register = asyncWrapper(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.creat(
      "user is already exsist",
      400,
      httpstatustxt.FAIL
    );
    return next(error);
  }
  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPass,
  });
  const token = await generateJWT({ email: newUser.email, id: newUser._id });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpstatustxt.SUCCESS, data: { user: newUser } });
});

//login
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appError.creat(
      "email and password are require",
      400,
      httpstatustxt.FAIL
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.creat(
      "wrong email or password",
      500,
      httpstatustxt.ERROR
    );
    return next(error);
  }
  const matchedPass = await bcrypt.compare(password, user.password);
  if (user && matchedPass) {
    const token = await generateJWT({ email: user.email, id: user._id });
    user.token = token;
    return res.json({ status: httpstatustxt.SUCCESS, data: { token } });
  } else {
    const error = appError.creat("somthing wrong", 500, httpstatustxt.ERROR);
    return next(error);
  }
});
module.exports = {
  register,
  login,
};
