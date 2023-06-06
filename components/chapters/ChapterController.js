const chapterService = require("./ChapterService")
const addChapter = async (title, chapter_number, page, date) =>{
    return await chapterService.addChapter(title,chapter_number, page, date);
}
const editChapterById = async (id, title, chapter_number, page, date) =>{
    return await chapterService.editChapterById(id, title, chapter_number, page, date);
}
const deleteChapterById = async (id)=>{
    return await chapterService.deleteChapterById(id);
}
module.exports = {addChapter, editChapterById, deleteChapterById}