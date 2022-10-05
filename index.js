const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongooose = require("mongoose");
const BlogPost = require("./models/BlogPost");

const app = new express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongooose.connect("YOUR MONGODB CONNECTION STRING GOES HERE", {
  useNewUrlParser: true,
});

const port = 4000;

app.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});

  res.render("index", { blogPosts });
});

app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});

app.get("/contact", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});

app.get("/post", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/post.html"));
  res.render("post");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  console.log(req.body);
  await BlogPost.create(req.body, (error, blogPost) => {
    res.redirect("/");
  });
});

app.get("/post/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  res.render("post", { blogPost });
});

app.listen(port, () => {
  console.log("App Listening on Port " + port);
});
