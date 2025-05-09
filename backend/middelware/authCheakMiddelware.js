const jwt = require("jsonwebtoken");

async function authCheakMiddelware(req, res, next) {
  jwt.verify(
    req.headers.token,
    process.env.JWT_secret,
    function (err, decoded) {
      if (err) {
        return res.status(500).json({ success: false, msg: "token error" });
      } else {
        next();
      }
    }
  );
}

module.exports = authCheakMiddelware;
