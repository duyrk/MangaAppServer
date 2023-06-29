var express = require("express");
var router = express.Router();
const mangacontroller = require("../../components/mangas/MangaController");
const characterController = require("../../components/characters/CharacterController");
const chapterController = require("../../components/chapters/ChapterController");
const { middleWare } = require("../../middlewares/auth");
router.get("/", middleWare.verifyToken, async function (req, res, next) {
  try {
    const data = await mangacontroller.getAllManga();
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
// http://localhost:3000/cpanel/manga/add
router.post("/add", middleWare.verifyToken, async function (req, res, next) {
  try {
    const { name, author, language, status, cover, genre, uploader } = req.body;
    const data = await mangacontroller.addManga(
      name,
      author,
      status,
      language,
      cover,
      0,
      0,
      uploader,
      [],
      genre,
      [],
      Date.now()
    );
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      data,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ reponseTimeStamp: new Date(), error: true, statusCode: 400 });
  }
});
// http://localhost:3000/cpanel/manga/:id/edit
router.get(
  "/:id/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const data = await mangacontroller.getMangaById(id);
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
          data: data,
        });
      }
    } catch (error) {
      return res.status(200).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        data: [],
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit
router.post(
  "/:id/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { updates } = req.body;
      const data = await mangacontroller.updateMangaById(id, updates);
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
        data: {},
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/characters
router.get(
  "/:id/edit/characters",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const manga = await mangacontroller.getMangaById(id);
      const data = manga.character;
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
        data: [],
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/characters/:characterId/edit
router.get(
  "/:id/edit/characters/:characterId/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id, characterId } = req.params;
      const data = await characterController.getCharacterId(characterId);
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
        data: {},
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/characters/:characterId/edit
router.post(
  "/:id/edit/characters/:characterId/edit",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id, characterId } = req.params;
      const { name, description, image } = req.body;
      const reponse = await characterController.editCharacterById(
        characterId,
        name,
        description,
        image
      );
      if (reponse) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This character has been edited succesfully!",
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "This action cannot be done, an error happend!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "This action cannot be done, an error happend!",
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/characters/add
router.post(
  "/:id/edit/characters/add",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, image } = req.body;
      const data = await characterController.addNewCharacter(
        name,
        description,
        image
      );
      const reponse = await mangacontroller.pushCharacter(id, data._id);
      if (reponse) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This character has been added succesfully!",
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "This action cannot be done, an error happend!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "This action cannot be done, an error happend!",
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/add-chapter
router.post(
  "/:id/edit/add-chapter",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { title, chapterNumber, page } = req.body;
      const chapter = await chapterController.addChapter(
        title,
        chapterNumber,
        page
      );
      const response = await mangacontroller.pushChapter(id, chapter._id);
      if (response) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This chapter has been added succesfully!",
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "This action cannot be done, an error happend!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "This action cannot be done, an error happend!",
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/chapter/:chapterId
router.get(
  "/:id/edit/chapter/:chapterId",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id, chapterId } = req.params;
      const data = await chapterController.getChapterById(chapterId);
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
        data: {},
      });
    }
  }
);
// http://localhost:3000/cpanel/manga/:id/edit/chapter/:chapterId
router.post(
  "/:id/edit/chapter/:chapterId",
  middleWare.verifyToken,
  async function (req, res, next) {
    try {
      const { id, chapterId } = req.params;
      const { title, chapterNumber, page } = req.body;
      const reponse = await chapterController.editChapterById(
        chapterId,
        title,
        chapterNumber,
        page,
        Date.now()
      );
      if (reponse) {
        return res.status(200).json({
          reponseTimeStamp: new Date(),
          error: false,
          statusCode: 200,
          message: "This chapter has been updated successfully!",
        });
      } else {
        return res.status(400).json({
          reponseTimeStamp: new Date(),
          error: true,
          statusCode: 400,
          message: "This action cannot be done, an error happend!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        reponseTimeStamp: new Date(),
        error: true,
        statusCode: 400,
        message: "This action cannot be done, an error happend!",
      });
    }
  }
);
module.exports = router;
