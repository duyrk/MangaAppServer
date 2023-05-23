const userModel = require("./UserModel")

const login = async (user_name, password) => {
    try {
        const user = await userModel.find({ user_name: user_name });
        if (user) {
            if (password === user.password) {
                return user
            } else {
                return null;
            }
        }
    } catch (error) {
        console.log("Login service error:" + error)
    }
    return null;
}

const signUp = async (user_name, password, email, nickname, bio, date_of_birth, favourite) => {
    const checkUser = userModel.find({ user_name: user_name })
    if (!checkUser) {
        try {
            const newUser = {
                user_name,
                password,
                email,
                nickname,
                bio,
                date_of_birth,
                favourite
            }
            await userModel.create(newUser);
            return true;
        } catch (error) {
            console.log('Sign Up Service Error:' + error)
        }
    }
    return false
}
module.exports = { login, signUp }