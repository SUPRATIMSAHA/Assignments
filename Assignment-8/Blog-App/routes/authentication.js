const express = require("express");
const User = require("../models/user");
const randomColor = require("randomcolor");
const passport = require("passport");

const router = express.Router();

router.get("/user/signup/", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("authentication/signup");
});

router.post("/user/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;
    const background = randomColor();
    console.log(background);
    const user = new User({ firstName, lastName, username, email, background });
    const newUser = await User.register(user, req.body.password);
    req.flash("success", "Account Created Successfully!!! Login to continue");
    res.redirect("/user/signin");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/signup");
  }
});

router.get("/user/signin/", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("authentication/signin");
});

router.post(
  "/user/signin",
  passport.authenticate("local", {
    failureRedirect: "/user/signin",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `${req.user.username} Welcome Back!!!`);
    res.redirect("/");
  }
);

router.get("/user/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged Out Successfully");
  res.redirect("/user/signin");
});

module.exports = router;
