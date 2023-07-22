var express = require("express");
var router = express.Router();
var mangaController = require("../../components/mangas/MangaController");
router.get("/get", async function (req, res, next) {
  try {
    const data = await mangaController.getAllManga();
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      errorMessage: error,
      data: [],
    });
  }
});
router.get("/get/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await mangaController.getMangaById(id);
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
        message: "Error occurs! Can't do this action",
        errorMessage: error,
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      message: "Error occurs! Can't do this action",
      errorMessage: error,
      data: {},
    });
  }
});
router.get("/title", async function (req, res, next) {
  try {
    const { keyword } = req.query;
    const data = await mangaController.searchManga(keyword);
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      message: "Error occurs! Can't do this action",
      errorMessage: error,
      data: [],
    });
  }
});
router.get("/genre", async function (req, res, next) {
  try {
    const { name } = req.query;
    const data = await mangaController.getMangaByGenre(name);
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      message: "Error occurs! Can't do this action",
      errorMessage: error,
      data: [],
    });
  }
});
module.exports = router;
