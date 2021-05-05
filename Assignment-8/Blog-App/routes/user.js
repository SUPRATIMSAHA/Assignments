const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const isLoggedIn = require("../middleware");

const router = express.Router();
const uploadImg = upload.single("img");

router.get("/user/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
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
        const result = await cloudinary.uploader.upload(req.file.path);
        await User.updateOne(
          { username: req.params.username },
          {
            $set: {
              img: result.secure_url,
              cloudinary_id: result.public_id,
            },
          },
          { upsert: true }
        );
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
      const user = await User.findOne({ username: req.params.username });
      await cloudinary.uploader.destroy(user.cloudinary_id);
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

module.exports = router;
