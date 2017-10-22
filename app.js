var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.listen(3000, '127.0.0.1', function () {
    console.log("server is running");
});

mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "First Blog",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzDpvl2EH43LKPnGpc4BkZpRMFfNGeFkSv7Y_ryv8mTxbVMg8b5A",
//     body: "This is the body text"
// });

//Routes

app.get("/", function (req, res) {
    res.redirect("/blogs");
});

//Index Route
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    })
});

//New Route
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//Create Route
app.post("/blogs", function (req, res) {

    Blog.create(req.body.blog, function (err, newBlog) {
        if(err){
            res.render("new")
        }else{
            res.redirect("/blogs");
        }
    })
});

//Show Route
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("show", {blog: foundBlog});
        }
    })
})
