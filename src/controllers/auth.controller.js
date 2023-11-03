const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const success = require("../utils/success");
const InvalidCredentialError = require("../utils/InvalidCredentialError");
const InternalError = require("../utils/InternalError");

exports.signup = async (req, res) => {
  const { username, email, password, image } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      image,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json(
      success({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
        },
        token,
      })
    );
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) return next(new InvalidCredentialError());

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json(
      success({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
        },
        token,
      })
    );
  } catch (error) {
    return next(new InternalError(error));
  }
};
