const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();
const uploadImg = upload.single("img");

router.get("/user/:username", async (req, res) => {
  let user = await User.findOne({ "local.username": req.params.username });
  if (!user) {
    user = await User.findOne({ "google.googleId": req.params.username });
  }
  const blogs = await Blog.find({ user: user._id });
  res.render("user/profile", { user, blogs });
});

router.post("/user/:username/profileImg/update", isLoggedIn, (req, res) => {
  try {
    uploadImg(req, res, async (err) => {
      if (err) {
        req.flash("error", err);
        return res.redirect(`/user/${req.params.username}`);
      } else {
        let user = await User.findOne({
          "local.username": req.params.username,
        });
        if (!user) {
          user = await User.findOne({ "google.googleId": req.params.username });
        }
        if (user && user.cloudinary_id) {
          await cloudinary.uploader.destroy(user.cloudinary_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "blog_app",
        });
        user.img = result.secure_url;
        user.cloudinary_id = result.public_id;
        await user.save();
        req.flash("success", "Profile photo updated successfully!!!");
        res.redirect(`/user/${req.params.username}`);
      }
    });
  } catch (err) {
    req.flash("error", err);
    res.redirect(`/user/${req.params.username}`);
  }
});

router.delete(
  "/user/:username/profileImg/delete",
  isLoggedIn,
  async (req, res) => {
    try {
      let user = await User.findOne({ "local.username": req.params.username });
      if (!user) {
        user = await User.findOne({ "google.googleId": req.params.username });
      }
      if (user && user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }
      user.img = "";
      user.cloudinary_id = "";
      await user.save();
      req.flash("success", "Successfully delete the profile picture");
      res.redirect(`/user/${req.params.username}`);
    } catch (err) {
      req.flash("error", err.message);
      res.redirect(`/user/${req.params.username}`);
    }
  }
);

router.patch("/account/userDetails/update", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    await user.save();
    req.flash("success", "Personal Details Updated Successfully");
    if (user.local.username) {
      res.redirect(`/user/${user.local.username}`);
    } else {
      res.redirect(`/user/${user.google.googleId}`);
    }
  } catch (err) {
    req.flash("error", err.message);
    if (user.local.username) {
      res.redirect(`/user/${user.local.username}`);
    } else {
      res.redirect(`/user/${user.google.googleId}`);
    }
  }
});

router.get("/account/reset/password", isLoggedIn, (req, res) => {
  res.render("authentication/confirm");
});

router.post("/account/check/password", isLoggedIn, async (req, res) => {
  try {
    if (!req.user.validPassword(req.body.password)) {
      throw new Error("Password not matched.");
    } else {
      res.redirect(`/reset/password?email=${req.user.email}`);
    }
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/account/reset/password");
  }
});

module.exports = router;
