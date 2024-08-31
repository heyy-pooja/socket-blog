const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { app, httpServer } = require("./socket/socket")
require("dotenv").config()
const path = require("path")




// Setp1 middleware
app.use(express.json())
app.use(express.static("dist"))
app.use(express.static("uploads"))
app.use(cors({ origin: true, credentials: true }))

// step2 routes
app.use("/api/blog", require("./routes/blog.routes"))
// tep 3 404 routes
app.use("*", (req, res) => {
    // dirname always return absalute path
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "resource not found 404" })
})
// tep 4 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
// step 5 connection
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    httpServer.listen(process.env.PORT, console.log("SERVER RUNNING"))

})