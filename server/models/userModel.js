const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const capitalize = require("lodash.capitalize");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  fullName: {
    type: String,
    required: true,
    set: function (value) {
      return capitalize(value);
    },
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  addresses: [
    {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      isDefault: Boolean,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  paymentMethods: [
    {
      cardNumber: String,
      cardHolderName: String,
      expirationDate: Date,
      isDefault: Boolean,
    },
  ],
  age: Number,
  uniqueId: {
    type: String,
    default: uuidv4,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/save/, function (next) {
  this.fullName = capitalize(this.fullName);

  next();
});

userSchema.pre(/save/, function (next) {
  if (this.dateOfBirth) {
    const dob = new Date(this.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    this.age = age;
  }

  next();
});

userSchema.pre(/save/, function (next) {
  if (this.isNew) {
    this.uniqueId = uuidv4();
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
