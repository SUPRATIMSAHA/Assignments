const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("./utils/passport");
const Blog = require("./models/blog");
// const seedDB = require("./seed");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// seedDB();

const sessionConfig = {
  secret: "sachinisgodofcricketandiamgoingtomeethim",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 }).limit(6);
  res.render("index", { blogs });
});

app.use(authRoutes);
app.use(userRoutes);
app.use(blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
