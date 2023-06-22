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
    let chapter = chapterModel.findById(id);
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
const deleteChapterById = async (id) => {
  try {
    return await chapterModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete" + error);
  }
};
module.exports = {
  getChapterById,
  addChapter,
  editChapterById,
  deleteChapterById,
};
