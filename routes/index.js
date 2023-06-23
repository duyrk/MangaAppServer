var express = require("express");
var router = express.Router();
const genreController = require("../components/genres/GenreController");
const userController = require("../components/users/UserController");
const jwt = require("jsonwebtoken");
/* GET home page. */
// http://localhost:3000/
router.get("/", async function (req, res, next) {});
// http://localhost:3000/feature
router.get("/feature", async function (req, res, next) {
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
// http://localhost:3000/cpanel/login
router.post("/login", async function (req, res, next) {
  try {
    const { user_name, password } = req.body;
    const user = await userController.login(user_name, password);
    if (user) {
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30s",
        }
      );
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: false,
        statusCode: 200,
        user: user,
        accessToken: accessToken,
      });
    }
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
