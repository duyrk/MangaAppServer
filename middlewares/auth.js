const jwt = require("jsonwebtoken");

const middleWare = {
  verifyToken: (req, res, next) => {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] == "Bearer"
    )
      token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
        if (err) return res.status(401).json("Token is not valid");
        console.log("data: " + data);
        req.user = data;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
};

module.exports = { middleWare };
