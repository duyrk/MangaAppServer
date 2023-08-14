const mangaService = require("./MangaService");
const getAllManga = async (page, size) => {
  return await mangaService.getAllManga(page, size);
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
  banner,
  description,
  views,
  likes,
  uploader,
  character,
  genre,
  chapter,
  date
) => {
  return await mangaService.addManga(
    name,
    author,
    status,
    language,
    cover,
    banner,
    description,
    views,
    likes,
    uploader,
    character,
    genre,
    chapter,
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
const pushCharacter = async (id, characterId) => {
  return await mangaService.pushCharacter(id, characterId);
};
const pushChapter = async (id, chapterId) => {
  return await mangaService.pushChapter(id, chapterId);
};
const updateTime = async (id, time) => {
  return await mangaService.updateTime(id, time);
};
const getMangaByGenre = async (genre) => {
  return await mangaService.getMangaByGenre(genre);
};
module.exports = {
  getAllManga,
  getMangaById,
  addManga,
  updateMangaById,
  deleteMangaById,
  searchManga,
  pushCharacter,
  pushChapter,
  updateTime,
  getMangaByGenre,
};
