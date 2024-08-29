const express = require("express")
const http = require("http")
const { mongoose } = require("mongoose")
const { Server } = require("socket.io")

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, { cors: { origin: "*" } })

module.exports = { io, app, httpServer }