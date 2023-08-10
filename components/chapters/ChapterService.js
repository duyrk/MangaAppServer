const mangaModel = require("../mangas/MangaModel");
const chapterModel = require("./ChapterModel");
const getChapterById = async (id) => {
  try {
    return await chapterModel.findById(id);
  } catch (error) {
    console.log("Get Chapter By Id error" + error);
  }
  return null;
};
const addChapter = async (title, chapter_number, page, date) => {
  try {
    const newChapter = {
      title,
      chapter_number,
      page,
      date,
    };
    const chapter = await chapterModel.create(newChapter);
    return chapter;
  } catch (error) {
    console.log("Add Chapter Service error" + error);
  }
  return {};
};
const editChapterById = async (id, title, chapter_number, page, date) => {
  try {
    let chapter = await chapterModel.findById(id);
    if (chapter) {
      chapter.title = title ? title : chapter.title;
      chapter.chapter_number = chapter_number
        ? chapter_number
        : chapter.chapter_number;
      chapter.page = page ? page : chapter.page;
      chapter.date = date ? date : chapter.date;
      await chapter.save();
      return true;
    }
  } catch (error) {
    console.log("Edit chapter service error:" + error);
  }
  return false;
};
const deleteChapterById = async (mangaId, id) => {
  try {
    const manga = await mangaModel.findById(mangaId);
    if (manga) {
      let index = manga.chapter.findIndex((object) => object._id == id);
      manga.chapter.splice(index, 1);
      await manga.save();
    }
    return await chapterModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete chapter service" + error);
  }
};
const getChapterByIdWithSideChapter = async (mangaId, chapterId) => {
  try {
    const manga = await mangaModel.findById(mangaId);
    const chapter = await chapterModel.findById(chapterId);
    let index = manga.chapter.findIndex((chapter) => chapter == chapterId);
    let nextChapterId = manga.chapter[index + 1];
    let previousChapterId = manga.chapter[index - 1];
    console.log("previous" + previousChapterId);
    return { chapter, nextChapterId, previousChapterId };
  } catch (error) {
    console.log("Get chapter by id with side chapter" + error);
  }
  return null;
};
module.exports = {
  getChapterById,
  addChapter,
  editChapterById,
  deleteChapterById,
  getChapterByIdWithSideChapter,
};
