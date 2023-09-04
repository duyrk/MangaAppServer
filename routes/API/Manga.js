var express = require("express");
var router = express.Router();
var mangaController = require("../../components/mangas/MangaController");
var chapterController = require("../../components/chapters/ChapterController");
var genreController = require("../../components/genres/GenreController");
const { middleWare } = require("../../middlewares/auth");
router.get("/get", middleWare.verifyToken, async function (req, res, next) {
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
router.get("/get/:id", middleWare.verifyToken, async function (req, res, next) {
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
router.get("/title", middleWare.verifyToken, async function (req, res, next) {
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
router.get("/genre", middleWare.verifyToken, async function (req, res, next) {
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
router.get(
  "/getChapter",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { mangaId, chapterId } = req.query;
      const response = await chapterController.getChapterByIdWithSideChapter(
        mangaId,
        chapterId
      );
      const { chapter, nextChapterId, previousChapterId } = response;
      if (response) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          data: {
            chapter,
            nextChapterId: nextChapterId ?? "",
            previousChapterId: previousChapterId ?? "",
          },
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "Error occurs! Can't do this action",
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
  }
);
router.get(
  "/genre/getAll",
  middleWare.verifyToken,
  async function (req, res, next) {
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
  }
);
module.exports = router;
