const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, default: true },
    complete: { type: Boolean, default: false }
})
module.exports = mongoose.model("blog", blogSchema)