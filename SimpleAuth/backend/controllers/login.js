const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send({ msg: "User with this email does not exist" });
    }
    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      res.status(200).send({ msg: "success" });
    }
  } catch (error) {
    console.log("wrong");
  }
  next();
};

module.exports = login;
