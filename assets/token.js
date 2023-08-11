const jwt = require("jsonwebtoken");
const token = {
  accessToken: (user) => {
    return jwt.sign(
      { id: user._id ?? user.id, role: user.role },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2h",
      }
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      { id: user._id ?? user.id, role: user.role },
      process.env.REFRESH_ACCESS_TOKEN,
      {
        expiresIn: "90d",
      }
    );
  },
};
module.exports = { token };
