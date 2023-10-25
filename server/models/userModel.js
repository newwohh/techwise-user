const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const capitalize = require("lodash.capitalize");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
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
    validate: {
      validator: function (value) {
        const today = new Date();
        const maxDate = new Date("2005-01-01");
        return value <= maxDate && value < today;
      },
      message: "User must be born before 2005.",
    },
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Phone number must be 10 digits long.",
    },
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
  position: {
    type: String,
    required: true,
    enum: ["CEO", "CFO", "CTO", "Manager", "Supervisor", "Employee", "Other"],
  },
  businessType: {
    type: String,
    required: true,
    enum: ["Sole Proprietorship", "Partnership", "Corporation", "LLC", "Other"],
  },
  businessName: {
    type: String,
    required: true,
  },
  gstRegisteredNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  isPlusMember: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre(/save/, function (next) {
  if (!this.username) {
    const emailParts = this.email.split("@");
    const username = `${emailParts[0]}_${uuidv4().substring(0, 8)}`;

    this.username = username;
  }

  next();
});

userSchema.pre(/save/, async function (next) {
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
