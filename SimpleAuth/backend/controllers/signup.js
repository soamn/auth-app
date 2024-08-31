const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const signup = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 2);
    const email = await req.body.email.toLowerCase();

    const user = await userModel.create({
      email: email,
      username: req.body.username,
      password: passwordHash,
    });

    if (user) {
      res.status(200).send({ msg: "signedUp" });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = signup;
