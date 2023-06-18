var express = require("express");
var router = express.Router();
const genreController = require("../../components/genres/GenreController");

// http://localhost:3000/cpanel/genre/add
router.post("/add", async function (req, res, next) {
  try {
    const { name, description } = req.body;
    await genreController.addNewGenre(name, description);
    return res
      .status(200)
      .json({ reponseTimeStamp: new Date(), error: false, statusCode: 200 });
  } catch (error) {
    return res
      .status(400)
      .json({ reponseTimeStamp: new Date(), error: true, statusCode: 400 });
  }
});
// http://localhost:3000/cpanel/genre/123/delete
router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    await genreController.deleteGenre(id);
    return res
      .status(200)
      .json({ reponseTimeStamp: new Date(), error: false, statusCode: 200 });
  } catch (error) {
    return res
      .status(400)
      .json({ reponseTimeStamp: new Date(), error: true, statusCode: 400 });
  }
});
// http://localhost:3000/cpanel/genre/123/edit
router.get("/:id/edit", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await genreController.getGenreById(id);
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

module.exports = router;
