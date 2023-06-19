const characterService = require("./CharacterService");

const addNewCharacter = async (name, description) => {
  return await characterService.addNewCharacter(name, description);
};
const getCharacterId = async (id) => {
  return await characterService.getCharacterId(id);
};
const editCharacterById = async (id, name, description, image) => {
  return await characterService.editCharacterById(id, name, description, image);
};
const deleteCharacterById = async (id) => {
  return await characterService.deleteCharacterById(id);
};
module.exports = {
  addNewCharacter,
  getCharacterId,
  editCharacterById,
  deleteCharacterById,
};
