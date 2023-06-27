var express = require("express");
var router = express.Router();
const genreController = require("../components/genres/GenreController");
const userController = require("../components/users/UserController");
const jwt = require("jsonwebtoken");
const { middleWare } = require("../middlewares/auth");
const { token } = require("../assets/token");
const { authControllers } = require("../components/auth/authControllers");
const e = require("express");
/* GET home page. */
// http://localhost:3000/
router.get("/", async function (req, res, next) {});
// http://localhost:3000/feature
router.get("/genre", middleWare.verifyToken, async function (req, res, next) {
  try {
    const data = await genreController.getAllGenre();
    if (data) {
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: false,
        statusCode: 200,
        data: data,
      });
    } else {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      data: [],
    });
  }
});
router.post(
  "/genre/:genreId/delete",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { genreId } = req.params;
      const reponse = await genreController.deleteGenre(genreId);
      if (reponse) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This genre has been deleted successfully!",
        });
      } else {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "Error occur! Can't do this action, try again!",
        });
      }
    } catch (error) {
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "Error occur! Can't do this action, try again!",
      });
    }
  }
);
router.post(
  "/genre/add",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { name, description } = req.body;
      const data = await genreController.addNewGenre(name, description);
      if (data) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This genre has been added successfully!",
          data: data,
        });
      } else {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "This genre was created before",
          data: {},
        });
      }
    } catch (error) {
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "Error occur! Can't do this action, try again!",
        data: {},
      });
    }
  }
);
router.get(
  "/genre/:id/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const data = await genreController.getGenreById(id);
      if (data != null) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          data: data,
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          data: {},
        });
      }
    } catch (error) {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        data: {},
      });
    }
  }
);
router.post(
  "/genre/:id/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const reponse = await genreController.updateGenre(id, name, description);
      if (reponse) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This genre has been edited successfully!",
        });
      } else {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "Error occur! Can't do this action, try again!",
        });
      }
    } catch (error) {
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "Error occur! Can't do this action, try again!",
      });
    }
  }
);
// http://localhost:3000/cpanel/login
router.post("/login", async function (req, res, next) {
  try {
    const { user_name, password } = req.body;
    const user = await userController.login(user_name, password);

    if (user) {
      if (user.role === 0) {
        return res.status(403).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 403,
          message: "You're not allowed to do this action!",
        });
      }
      const { password, ...others } = user._doc;
      res.cookie("refreshToken", token.refreshToken(user), {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: false,
        statusCode: 200,
        user: others,
        accessToken: token.accessToken(user),
      });
    }
  } catch (error) {
    console.log("Error:" + error);
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      user: {},
    });
  }
});
router.post("/refresh", authControllers.requestRefreshToken);
module.exports = router;
