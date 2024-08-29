const asyncHandler = require("express-async-handler")
const Blog = require("../modal/Blog")
const { io } = require("../socket/socket")

exports.getAllBlogs = asyncHandler(async (req, res) => {
    const result = await Blog.find()
    res.json({ message: "fetch All Blogs Sucess", result })
})
exports.addBlog = asyncHandler(async (req, res) => {
    await Blog.create(req.body)
    const result = await Blog.find()
    io.emit("todo-create-responce", result)
    res.json({ message: "add Blog Sucess" })
})
exports.updateBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "update Blog Sucess" })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "delete Blog Sucess" })
})