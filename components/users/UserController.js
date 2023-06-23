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
  date_of_birth,
  favourite
) => {
  return await userService.signUp(
    user_name,
    password,
    email,
    nickname,
    bio,
    date_of_birth,
    favourite
  );
};
const updateUserById = async (id, updates) => {
  return await userService.updateUserById(id, updates);
};
module.exports = { login, signUp, updateUserById };
