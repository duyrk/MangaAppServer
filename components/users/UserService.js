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
    try {
    const checkUser = await userModel.findOne({ user_name: user_name })
    if (!checkUser) {

            const newUser = {
                user_name,
                password,
                email,
                nickname,
                bio,
                date_of_birth,
                favourite,
                role
            }
            await userModel.create(newUser);
            return true;
        }
        } catch (error) {
            console.log('Sign Up Service Error:' + error)
        }
   
    return false
}
const updateUserById = async (id, updates)=>{
    try {
        let user = userModel.findById(id)
        Object.assign(user, updates);
        await user.save();
        return user;
    } catch (error) {
        console.log('Update user by id error'+error)
    }
    return [];
}
module.exports = { login, signUp }