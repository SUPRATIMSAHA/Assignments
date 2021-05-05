const express = require("express");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let blogs = [
  {
    id: uuidv4(),
    title: "Blog Article",
    img:
      "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Sabeel Bhaiya",
    blog:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat tempora commodi deleniti mollitia, quidem labore. Doloremque ipsum quia mollitia non nesciunt voluptas alias, facere porro deleniti repellendus placeat accusamus aliquid?",
  },
  {
    id: uuidv4(),
    title: "First Article",
    img:
      "https://images.unsplash.com/photo-1590808100071-3654286139a4?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Supratim Saha",
    blog:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat tempora commodi deleniti mollitia, quidem labore. Doloremque ipsum quia mollitia non nesciunt voluptas alias, facere porro deleniti repellendus placeat accusamus aliquid?",
  },
];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/blogs", (req, res) => {
  res.render("blogs", { blogs });
});

app.get("/new", (req, res) => {
  res.render("Add_New");
});

app.post("/blogs/add_new", (req, res) => {
  const { title, img, author, blog } = req.body;
  blogs.push({ id: uuidv4(), title, img, author, blog });
  res.redirect("/blogs");
});

app.get("/blogs/:id/info", (req, res) => {
  const { id } = req.params;
  const temp = blogs.find((b) => b.id === id);
  res.render("info", { temp });
});

app.get("/blogs/:id/edit", (req, res) => {
  const { id } = req.params;
  const temp = blogs.find((b) => b.id === id);
  res.render("edit", { temp });
});

app.patch("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, img, author, blog } = req.body;
  const foundBlog = blogs.find((b) => b.id === id);
  foundBlog.title = title;
  foundBlog.img = img;
  foundBlog.author = author;
  foundBlog.blog = blog;
  res.redirect("/blogs");
});

app.delete("/blogs/:id/delete", (req, res) => {
  const { id } = req.params;
  const temp = blogs.filter((b) => b.id !== id);
  blogs = temp;
  res.redirect("/blogs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
