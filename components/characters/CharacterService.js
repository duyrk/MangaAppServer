const characterModel = require("./CharacterModel");
const mangaModel = require("../mangas/MangaModel");
const addNewCharacter = async (name, description, image) => {
  try {
    const character = {
      name,
      description,
      image,
    };
    return await characterModel.create(character);
  } catch (error) {
    console.log("Add new character error" + error);
  }
  return {};
};
const getCharacterId = async (id) => {
  try {
    return await characterModel.findById(id);
  } catch (error) {
    console.log("Get character by Id" + error);
  }
  return {};
};
const editCharacterById = async (id, name, description, image) => {
  try {
    let character = await characterModel.findById(id);
    if (character) {
      character.name = name ? name : character.name;
      character.description = description ? description : character.description;
      character.image = image ? image : character.image;
      await character.save();
      return true;
    }
  } catch (error) {
    console.log("Edit Character by id error" + error);
  }
  return false;
};
const deleteCharacterById = async (mangaId, id) => {
  try {
    const manga = await mangaModel.findById(mangaId);
    if (manga) {
      let index = manga.character.findIndex((object) => object._id == id);
      manga.character.splice(index, 1);
      await manga.save();
    }
    return await characterModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Delete Character by id error: " + error);
  }
};

module.exports = {
  addNewCharacter,
  getCharacterId,
  editCharacterById,
  deleteCharacterById,
};
