const characterModel = require("./CharacterModel");

const addNewCharacter = async (name, description) => {
  try {
    const user = {
      name,
      description,
    };
    await characterModel.create(user);
    return true;
  } catch (error) {
    console.log("Add new character error" + error);
  }
  return false;
};
const getCharacterId = async (id) => {
  try {
    return await characterModel.findById(id);
  } catch (error) {
    console.log("Get character by Id" + error);
  }
  return {};
};
const editCharacterById = async (id, name, description) => {
  try {
    let character = characterModel.findById(id);
    if (character) {
      character.name = name ? name : character.name;
      character.description = description ? description : character.description;
      await character.save();
      return true;
    }
  } catch (error) {
    console.log("Edit Character by id error" + error);
  }
  return false;
};
const deleteCharacterById = async (id) => {
  try {
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
