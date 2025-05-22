const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // exclude from queries unless explicitly selected
    },
    img: {
      type: String,
      default: "data:image/jpeg;base64,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"
    },
    about: {
      type: String,
      default: "This is default about for user!!"
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
