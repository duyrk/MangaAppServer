const UserModel = require('../users/UserModel');
const genreModel = require('./GenreModel')

const getAllGenre = async () =>{
    try {
        return await genreModel.find();
    } catch (error) {
        console.log('Get All Genres Service Error:'+error)
        return [];
    }
}
const addNewGenre = async (name, description)=>{
    try {
    const checkGenre = await genreModel.findOne({name: name})
    if(!checkGenre){
            const genre = {
                name,
                description
            }
            await UserModel.create(genre);
            return true;
    }
    } catch (error) {
        console.log('Add new genre service'+error)

    }
    return false;

}
const updateGenre = async (id, name, description)=>{
    try {
        let genre = await genreModel.findById(id);
        if(genre){
            genre.name = name ? name : genre.name
            genre.description = description ? name : genre.description
            await genre.save();
            return true;
        }
    } catch (error) {
        console.log('Update Genre Service Error: '+error)
    }
    return false;
}
const deleteGenre = async (id)=>{
    try {
        return await genreModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Delete Genre Error'+error)
    }
}

module.exports = {getAllGenre, addNewGenre, updateGenre, deleteGenre}