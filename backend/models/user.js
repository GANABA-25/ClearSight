const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1755801165/GroupBox/account_zthiqy.png",
  },

  gettingStarted: {
    completed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },

  onboarding: {
    completed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    completedAt: {
      type: Date,
    },
    userHistory: {
      glasses: {
        type: String,
        required: false,
      },
      eyeCondition: {
        type: String,
        required: false,
      },
      familyEyeHistory: {
        type: String,
        required: false,
      },
      medicalCondition: {
        type: String,
        required: false,
      },
    },
  },
});

module.exports = mongoose.model("user", userSchema);
