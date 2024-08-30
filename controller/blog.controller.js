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
            const {
                title,
                desc,
                images

            } = req.body
            await Blog.create({ images: req.file.filename, title, desc })
            const result = await Blog.find()
            io.emit("todo-create-responce", result)
            return res.json({ message: "add Blog Sucess" })

        })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})

// exports.addBlog = asyncHandler(async (req, res) => {
//     try {

//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ message: "File upload error: " + err.message });
//             }

//             const { title, desc } = req.body;


//             if (!title || !desc || !req.file) {
//                 return res.status(400).json({ message: "Title, description, and image are required" });
//             }

//             try {

//                 const newBlog = await Blog.create({
//                     image: req.file.filename,
//                     title,
//                     desc
//                 });


//                 const result = await Blog.find();
//                 io.emit("todo-create-response", result);


//                 return res.json({ message: "Blog added successfully" });
//             } catch (dbError) {
//                 return res.status(500).json({ message: "Database error: " + dbError.message });
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Unexpected error: " + error.message });
//     }
// });
exports.updateBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "update Blog Sucess" })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "delete Blog Sucess" })
})