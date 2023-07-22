var express = require("express");
var router = express.Router();
var userController = require("../../components/users/UserController");
router.post("/login", async function (req, res, next) {
  try {
    const { user_name, password } = req.body;
    const response = await userController.login(user_name, password);
    if (response) {
      return res.status(200).json({
        responseTimeStamp: new Date(),
        status: 200,
        error: false,
        data: response,
      });
    } else {
      return res.status(400).json({
        responseTimeStamp: new Date(),
        status: 400,
        error: true,
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      responseTimeStamp: new Date(),
      status: 400,
      error: true,
      data: {},
    });
  }
});
router.post("/register", async function (req, res, next) {
  try {
    const { user_name, password, email, nickname, bio, date_of_birth } =
      req.body;
    const response = await userController.signUp(
      user_name,
      password,
      email,
      nickname,
      bio,
      date_of_birth
    );
    if (response) {
      return res.status(200).json({
        responseTimeStamp: new Date(),
        status: 200,
        error: false,
        message: "Sign Up Successfully!",
      });
    } else {
      return res.status(400).json({
        responseTimeStamp: new Date(),
        status: 400,
        error: true,
        message: "Error occurs! Can't sign up",
      });
    }
  } catch (error) {
    return res.status(400).json({
      responseTimeStamp: new Date(),
      status: 400,
      error: true,
      message: "Error occurs! Can't sign up",
      errorMessage: error,
    });
  }
});

module.exports = router;
