const mangaService = require("./MangaService");
const getAllManga = async () => {
  return await mangaService.getAllManga();
};
const getMangaById = async (id) => {
  return await mangaService.getMangaById(id);
};
const addManga = async (
  name,
  author,
  status,
  language,
  cover,
  views,
  likes,
  uploader,
  characters,
  genres,
  chapters,
  date
) => {
  return await mangaService.addManga(
    name,
    author,
    status,
    language,
    cover,
    views,
    likes,
    uploader,
    characters,
    genres,
    chapters,
    date
  );
};
const updateMangaById = async (id, updates) => {
  return await mangaService.updateMangaById(id, updates);
};
const deleteMangaById = async (id) => {
  return await mangaService.deleteMangaById(id);
};
const searchManga = async (keyword) => {
  return await mangaService.searchManga(keyword);
};
module.exports = {
  getAllManga,
  getMangaById,
  addManga,
  updateMangaById,
  deleteMangaById,
  searchManga,
};
