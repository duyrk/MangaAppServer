const mangaModel = require("./MangaModel");
const characterModel = require("../characters/CharacterModel");
const chapterModel = require("../chapters/ChapterModel");
const getAllManga = async (page, size) => {
  let skip = (page - 1) * size;
  try {
    return await mangaModel
      .find()
      .populate("character")
      .populate("genre")
      .populate("chapter")
      .skip(skip)
      .limit(size);
  } catch (error) {
    console.log("Get all Manga Service Error " + error);
  }
  return [];
};
const getMangaById = async (id) => {
  try {
    const manga = await mangaModel.findById(id);
    if (manga) return manga;
  } catch (error) {
    console.log("Get Manga By Id error" + error);
  }
  return null;
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
  try {
    const manga = {
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
      date,
    };
    await mangaModel.create(manga);
    return true;
  } catch (error) {
    console.log("Add Manga Service error" + error);
  }
  return false;
};
const updateMangaById = async (id, updates) => {
  // updates must be an object
  try {
    let manga = await mangaModel.findById(id);
    Object.assign(manga, updates);
    await manga.save();
    return manga;
  } catch (error) {
    console.log("Update Manga By Id error" + error);
  }
  return [];
};
const deleteMangaById = async (id) => {
  try {
    const manga = await mangaModel.findById(id);
    for (characterId of manga.characters) {
      await characterModel.findByIdAndDelete(characterId);
    }
    for (chapterId of manga.chapters) {
      await chapterModel.findById(chapterId);
    }
    return await mangaModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete manga by id" + error);
  }
};
const searchManga = async (keyword) => {
  try {
    let query = {
      name: { $regex: keyword, $options: "i" },
    };
    let manga = await mangaModel.find(query);
    return manga;
  } catch (error) {
    console.log("Search Manga Service error " + error);
  }
};
module.exports = {
  getAllManga,
  getMangaById,
  addManga,
  updateMangaById,
  deleteMangaById,
  searchManga,
};
