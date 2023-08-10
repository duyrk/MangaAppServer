const chapterService = require("./ChapterService");
const getChapterById = async (id) => {
  return await chapterService.getChapterById(id);
};
const addChapter = async (title, chapter_number, page, date) => {
  return await chapterService.addChapter(title, chapter_number, page, date);
};
const editChapterById = async (id, title, chapter_number, page, date) => {
  return await chapterService.editChapterById(
    id,
    title,
    chapter_number,
    page,
    date
  );
};
const deleteChapterById = async (mangaId, id) => {
  return await chapterService.deleteChapterById(mangaId, id);
};
const getChapterByIdWithSideChapter = async (mangaId, chapterId) => {
  return await chapterService.getChapterByIdWithSideChapter(mangaId, chapterId);
};
module.exports = {
  getChapterById,
  addChapter,
  editChapterById,
  deleteChapterById,
  getChapterByIdWithSideChapter,
};
