var express = require("express");
var router = express.Router();
const genreController = require("../components/genres/GenreController");
const userController = require("../components/users/UserController");
/* GET home page. */
// http://localhost:3000/
router.get("/", async function (req, res, next) {});
// http://localhost:3000/feature
router.get("/feature", async function (req, res, next) {
  try {
    const data = await genreController.getAllGenre();
    res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 400,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      data: [],
    });
  }
});
// http://localhost:3000/login
router.post("/login", async function (req, res, next) {
  try {
    const { user_name, password } = req.body;
    const user = await userController.login(user_name, password);
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      user: user,
    });
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      user: {},
    });
  }
});

module.exports = router;
