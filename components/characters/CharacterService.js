const characterModel = require("./CharacterModel")

const addNewCharacter = async (name, description)=>{
    try {
        const user = {
            name,
            description
        }
        await characterModel.create(user);
        return true;
    } catch (error) {
        console.log('Add new character error'+error)
    }
    return false;
}
const deleteCharacterById = async (id)=>{
    try {
        return await characterModel.findByIdAndDelete(id)
    } catch (error) {
        console.log('Delete Character by id error: '+error)
    }
}

module.exports = {addNewCharacter, deleteCharacterById}