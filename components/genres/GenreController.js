const genreService = require("./GenreService");

const getAllGenre = async () => {
  return await genreService.getAllGenre();
};
const getGenreById = async (id) => {
  return await genreService.getGenreById(id);
};
const addNewGenre = async (name, description) => {
  return await genreService.addNewGenre(name, description);
};
const updateGenre = async (id, name, description) => {
  return await genreService.updateGenre(id, name, description);
};
const deleteGenre = async (id) => {
  return await genreService.deleteGenre(id);
};

module.exports = {
  getAllGenre,
  getGenreById,
  addNewGenre,
  updateGenre,
  deleteGenre,
};
