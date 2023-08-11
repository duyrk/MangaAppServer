var express = require("express");
var router = express.Router();
var userController = require("../../components/users/UserController");
const { token } = require("../../assets/token");
const jwt = require("jsonwebtoken");
const { middleWare } = require("../../middlewares/auth");
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
        access_token: token.accessToken(response),
        refresh_token: token.refreshToken(response),
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
    const { user_name, password, email } = req.body;
    console.log("user_name" + user_name + " password" + password);
    const response = await userController.signUp(
      user_name,
      password,
      email,
      "",
      "",
      Date.now()
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
router.post(
  "/:id/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { updates } = req.body;
      const user = await userController.updateUserById(id, updates);
      if (user) {
        return res.status(200).json({
          responseTimeStamp: new Date(),
          status: 200,
          error: false,
          message: "You account updated Successfully!",
        });
      } else {
        return res.status(400).json({
          responseTimeStamp: new Date(),
          status: 400,
          error: true,
          message: "Error occurs! Can't update your account",
        });
      }
    } catch (error) {
      return res.status(400).json({
        responseTimeStamp: new Date(),
        status: 400,
        error: true,
        message: "Error occurs! Can't update your account",
        errorMessage: error,
      });
    }
  }
);
router.post("/refreshToken", async function (req, res, next) {
  try {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("data:" + data.id);
      return res.status(200).json({
        responseTimeStamp: new Date(),
        status: 200,
        error: false,
        message: "Refresh token successfully",
        accessToken: token.accessToken(data),
        refreshToken: token.refreshToken(data),
      });
    });
  } catch (error) {
    return res.status(400).json({
      responseTimeStamp: new Date(),
      status: 400,
      error: true,
      message: "Error occurs! Can't update your account",
      errorMessage: error,
    });
  }
});
module.exports = router;
