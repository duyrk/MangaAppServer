const characterService = require("./CharacterService")

const addNewCharacter = async (name, description)=>{
    return await characterService.addNewCharacter(name, description)
}
const deleteCharacterById = async (id)=>{
    return await characterService.deleteCharacterById(id)
}

module.exports = {addNewCharacter, deleteCharacterById}