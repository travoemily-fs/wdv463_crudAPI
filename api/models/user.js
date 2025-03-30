const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Email invalid."],
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  // run hashing and salting
  bcrypt.genSalt(10, function (error, salt) {
    if (error) return next(err);

    bcrypt.hash(user.password, salt, null, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      // skip hashing and salting
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidate, callback) {
  bcrypt.compare(candidate, this.password, function (error, isMatch) {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};
module.exports = mongoose.model("User", userSchema);
