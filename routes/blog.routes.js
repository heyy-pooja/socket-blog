const router = require("express").Router()
const blogController = require("../controller/blog.controller")

router
    .get("/", blogController.getAllBlogs)
    .post("/add", blogController.addBlog)
    .put("/update/:id", blogController.updateBlog)
    .delete("/delete/:id", blogController.deleteBlog)

module.exports = router