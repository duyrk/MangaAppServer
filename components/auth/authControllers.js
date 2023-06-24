const jwt = require("jsonwebtoken");
const { token } = require("../../assets/token");

const authControllers = {
  requestRefreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    res.status(200).json(refreshToken);
    if (!refreshToken) return res.status(401).json("You're not authorized");
    jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, data) => {
      if (err) {
        console.log(err);
      }
      const newAcessToken = token.accessToken(data);
      const newRefreshToken = token.refreshToken(data);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAcessToken });
    });
  },
};
module.exports = { authControllers };
