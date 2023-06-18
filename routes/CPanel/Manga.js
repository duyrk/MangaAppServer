var express = require("express");
var router = express.Router();
const mangacontroller = require("../../components/mangas/MangaController");
const characterController = require("../../components/characters/CharacterController");
router.post("/add", async function (req, res, next) {
  try {
    const { name, author, language, status, cover, genres, uploader } =
      req.body;
    await mangacontroller.addManga(
      name,
      author,
      status,
      language,
      cover,
      0,
      0,
      uploader,
      [],
      genres,
      [],
      Date.now()
    );
    return res
      .status(200)
      .json({ reponseTimeStamp: new Date(), error: false, statusCode: 200 });
  } catch (error) {
    return res
      .status(400)
      .json({ reponseTimeStamp: new Date(), error: true, statusCode: 400 });
  }
});
router.get("/:id/edit", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await mangacontroller.getMangaById(id);
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: false,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    return res.status(200).json({
      reponseTimeStamp: new Date(),
      error: true,
      statusCode: 400,
      data: [],
    });
  }
});
router.post("/:id/edit", async function (req, res, next) {
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
});
router.get("/:id/edit/characters", async function (req, res, next) {
  try {
    const { id } = req.params;
    const manga = await mangacontroller.getMangaById(id);
    const data = manga.characters;
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
});
router.get(
  "/:id/edit/characters/:characterId/edit",
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
module.exports = router;
