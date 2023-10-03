const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const id = user._id;

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User registration went wrong!",
      });
    }

    createToken(id, res);
    user.password = undefined;
    user.__v = undefined;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    const id = user._id;

    await user.correctPassword(password, user.password);
    createToken(id, res);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
