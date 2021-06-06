const express = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();
const uploadImg = upload.single("img");

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("user");
  res.render("blogs/index", { blogs });
});

router.get("/blogs/new", isLoggedIn, (req, res) => {
  res.render("blogs/new");
});

router.post("/blogs", isLoggedIn, (req, res) => {
  try {
    uploadImg(req, res, async (err) => {
      if (err) {
        req.flash("error", err);
        return res.redirect("/blogs/new");
      } else {
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "blog_app",
        });
        const { title, body } = req.body;
        const user = req.user._id;
        const img = result.secure_url;
        const cloudinary_id = result.public_id;
        String(body)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        await Blog.create({ user, title, img, body, cloudinary_id });
        req.flash("success", "Blog Created Successfully");
        res.redirect("/blogs");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/blogs");
  }
});

router.get("/blogs/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id)
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });
  res.render("blogs/show", { blog });
});

router.post("/blogs/blog/:id/comment", isLoggedIn, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    const comment = new Comment({
      user: req.user._id,
      comment: req.body.comment,
    });
    blog.comments.push(comment);

    await comment.save();
    await blog.save();

    req.flash("success", "Successfully added comment");
    res.redirect(`/blogs/blog/${req.params.id}`);
  } catch (err) {
    req.flash("error", "Cannot add comment to this blog");
    res.redirect(`/blogs/blog/${req.params.id}`);
  }
});

router.get("/blogs/blog/:id/edit", isLoggedIn, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/edit", { blog });
});

router.patch("/blogs/blog/:id/edit", isLoggedIn, async (req, res) => {
  try {
    uploadImg(req, res, async (err) => {
      if (err) {
        req.flash("error", err);
        return res.redirect(`/blogs/blog/${req.params.id}/edit`);
      } else {
        const blog = await Blog.findById(req.params.id);
        await cloudinary.uploader.destroy(blog.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "blog_app",
        });
        const data = {
          title: req.body.title || blog.title,
          img: result.secure_url || blog.img,
          body: req.body.body || blog.body,
          cloudinary_id: result.public_id || blog.cloudinary_id,
        };
        String(data.body)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
        req.flash("success", "Blog Updated Successfully");
        res.redirect("/blogs");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(`/blogs/blog/${req.params.id}/edit`);
  }
});

router.delete("/blogs/blog/:id/delete", isLoggedIn, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await cloudinary.uploader.destroy(blog.cloudinary_id);
    await blog.remove();
    req.flash("success", "Successfully Delete the Blog");
    res.redirect("/blogs");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/blogs");
  }
});

module.exports = router;
