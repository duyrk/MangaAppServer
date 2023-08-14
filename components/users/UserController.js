const userService = require("./UserService");
const login = async (user_name, password) => {
  return await userService.login(user_name, password);
};
const signUp = async (
  user_name,
  password,
  email,
  nickname,
  bio,
  date_of_birth
) => {
  return await userService.signUp(
    user_name,
    password,
    email,
    nickname,
    bio,
    date_of_birth
  );
};
const updateUserById = async (id, updates) => {
  return await userService.updateUserById(id, updates);
};
const getUserById = async (id) => {
  return await userService.getUserById(id);
};
const addToFavorites = async (mangaId, userId) => {
  return await userService.addToFavorites(mangaId, userId);
};
const removeFromFavorites = async (mangaId, userId) => {
  return await userService.removeFromFavorites(mangaId, userId);
};
module.exports = {
  login,
  signUp,
  updateUserById,
  getUserById,
  addToFavorites,
  removeFromFavorites,
};
