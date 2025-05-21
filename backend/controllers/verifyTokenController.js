const jwt = require("jsonwebtoken");

async function verifyTokenController(req, res, next) {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_secret, function (err, decoded) {
    if (decoded && decoded.user) {
      res.status(200).json({ msg: "valid user", success: true });
    } else {
      res.status(400).json({ msg: "err", success: false });
    }
  });
}

module.exports = verifyTokenController;
