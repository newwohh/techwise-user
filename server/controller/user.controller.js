const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { cloudinary, opts } = require("../utils/cloudinary");

const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None",
    secure: true,
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

exports.updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const { fullName, email, mobile } = req.body;

    if (!email || !mobile) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName: fullName, phoneNumber: mobile, email: email },
      { new: true }
    );

    if (updatedUser) {
      return res.json({
        status: "success",
        updatedUser,
      });
    }

    return res.status(404).json({
      status: "not found",
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.uploadProfilePic = async (req, res) => {
  try {
    const _id = req.body.user;

    if (!id) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const uploadImage = async (image) => {
      const upload = await cloudinary.uploader.upload(
        image,
        opts,
        (error, result) => {
          if (result && result.secure_url) {
            console.log(result);
            return result.secure_url;
          }
          if (error) {
            console.log(error);
          }
        }
      );
      return upload;
    };

    const img = await uploadImage(req.body.image);
    const updateProfilePicUrl = await User.findByIdAndUpdate(_id, {
      profilePicture: img.secure_url,
    });

    if (updateProfilePicUrl) {
      return res.status(200).json({
        status: "success",
        img: img.secure_url,
        user: updateProfilePicUrl,
      });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateUserAddress = async (res, id, Model, address) => {
  const createAddress = await Model.findByIdAndUpdate(
    id,
    {
      $push: {
        addresses: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country,
        },
      },
    },
    { new: true }
  );

  if (createAddress) {
    return res.json({
      status: "success",
      createAddress,
    });
  } else {
    return res.status(404).json({ error: "User not found." });
  }
};

exports.addAddress = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const address = {
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };
    if (!address) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const checkUser = await User.findById(id);

    if (checkUser.addresses.length == 0) {
      const createAddress = await updateUserAddress(res, id, User, address);
      return createAddress;
    } else {
      if (checkUser.isPlusMember) {
        const createAddress = await updateUserAddress(res, id, User, address);
        return createAddress;
      } else {
        return res.status(404).json({ error: "Subscribe to plus" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.removeAddress = async (req, res) => {
  try {
    const userId = req.body.id;

    if (!userId) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const addressId = req.body.addressId;

    if (!addressId) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (updatedUser) {
      return res.json({
        status: "success",
        user: updatedUser,
      });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.becomePlus = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const plusUser = await User.findByIdAndUpdate(id, {
      isPlusMember: true,
    });

    if (plusUser) {
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };

      res.cookie("plususer", true, cookieOptions);
      return res.json({
        status: "success",
        user: plusUser,
      });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).send("failed");
    console.log(error.message);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
