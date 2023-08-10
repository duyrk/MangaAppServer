const userModel = require("./UserModel");
const bcrypt = require("bcryptjs");
const login = async (user_name, password) => {
  try {
    const user = await userModel.findOne({ user_name: user_name });
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
        email,
        nickname,
        bio,
        date_of_birth,
        favourite: [],
        role: 0,
      };
      await userModel.create(newUser);
      return true;
    }
  } catch (error) {
    console.log("Sign Up Service Error:" + error);
  }

  return false;
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
module.exports = { login, signUp, updateUserById };
