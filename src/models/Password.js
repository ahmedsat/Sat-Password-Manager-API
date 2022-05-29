const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const PasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    url: {
      type: String,
      default: "",
      maxlength: 255,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

PasswordSchema.pre("save", async function () {
  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.AES_KEY
  ).toString();
});

PasswordSchema.post("findOne", async function (doc) {
  if (doc) {
    doc.password = CryptoJS.AES.decrypt(
      doc.password,
      process.env.AES_KEY
    ).toString(CryptoJS.enc.Utf8);
  }
});

PasswordSchema.post("find", async function (docs) {
  docs.forEach((doc) => {
    doc.password = CryptoJS.AES.decrypt(
      doc.password,
      process.env.AES_KEY
    ).toString(CryptoJS.enc.Utf8);
  });
});

module.exports = mongoose.model("Password", PasswordSchema);
