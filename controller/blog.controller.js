const asyncHandler = require("express-async-handler")
const Blog = require("../modal/Blog")
const { io } = require("../socket/socket")
const upload = require("../utils/upload")

exports.getAllBlogs = asyncHandler(async (req, res) => {
    const result = await Blog.find()
    res.json({ message: "fetch All Blogs Sucess", result })
})
exports.addBlog = asyncHandler(async (req, res) => {
    // await Blog.create(req.body)
    // const result = await Blog.find()
    // io.emit("todo-create-responce", result)
    // res.json({ message: "add Blog Sucess" })
    try {
        upload(req, res, async (err) => {
            await Blog.create({
                title: req.body.title,
                desc: req.body.desc,
                images: req.file.filename,
            })
            const result = await Blog.find()
            io.emit("todo-create-responce", result)
            return res.json({ message: "add Blog Sucess" })

        })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})


exports.updateBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "update Blog Sucess" })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "delete Blog Sucess" })
})