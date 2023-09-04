const userModel = require("./UserModel");
const bcrypt = require("bcryptjs");
const login = async (user_name, password) => {
  try {
    const user = await userModel
      .findOne({ user_name: user_name })
      .populate("favourite");
    if (user) {
      const checkPass = bcrypt.compareSync(password, user.password);
      return checkPass ? user : null;
    }
  } catch (error) {
    console.log("Login service error:" + error);
  }
  return null;
};

const signUp = async (
  user_name,
  password,
  email,
  nickname,
  bio,
  date_of_birth
) => {
  try {
    const checkUser = await userModel.findOne({ user_name: user_name });
    if (!checkUser) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = {
        user_name,
        password: hash,
        avatar: "",
        email,
        nickname,
        bio,
        date_of_birth,
        favourite: [],
        role: 0,
      };

      return await userModel.create(newUser);
    }
  } catch (error) {
    console.log("Sign Up Service Error:" + error);
  }

  return null;
};
const updateUserById = async (id, updates) => {
  try {
    let user = await userModel.findById(id);
    Object.assign(user, updates);
    await user.save();
    return user;
  } catch (error) {
    console.log("Update user by id error" + error);
  }
  return [];
};
const getUserById = async (id) => {
  try {
    const user = await userModel.findById(id).populate("favourite");
    return user;
  } catch (error) {
    console.log("Get user by id error" + error);
  }
  return null;
};
const addToFavorites = async (mangaId, userId) => {
  try {
    const user = await userModel.findById(userId).populate("favourite");
    user.favourite.push(mangaId);
    await user.save();
    const user1 = await userModel.findById(userId).populate("favourite");
    return user1;
  } catch (error) {
    console.log("Add to favorites service error: " + error);
  }
  return null;
};
const removeFromFavorites = async (mangaId, userId) => {
  try {
    const user = await userModel.findById(userId).populate("favourite");
    let index = user.favourite.findIndex((manga) => manga._id == mangaId);
    if (index == -1) return null;
    user.favourite.splice(index, 1);
    await user.save();
    const user1 = await userModel.findById(userId).populate("favourite");
    return user1;
  } catch (error) {
    console.log("removeFromFavorites" + error);
  }
  return null;
};
module.exports = {
  login,
  signUp,
  updateUserById,
  getUserById,
  addToFavorites,
  removeFromFavorites,
};
