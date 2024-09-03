const express = require('express')
const userController = require('../controllers/users.controller')
const Router = express.Router();

Router.route("/register").post(userController.register)
Router.route("/login").post(userController.login)

module.exports = Router;