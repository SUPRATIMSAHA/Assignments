const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  local: {
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    googleId: {
      type: String,
    },
    displayName: {
      type: String,
    },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  background: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
