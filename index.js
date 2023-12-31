// Main Express App
const express = require('express')
require("dotenv").config()

// MiddleWares
const { parseBlogStats } = require("./middlewares/blog-stats.js")
const { searchBlog } = require('./middlewares/searchBlog.js')


const app = express()
const port = process.env.PORT


// Default View
app.get('/', (req, res) => {
  res.send('Hello!')
})

// Sends the analysis data in form of JSON with Status code 200, 500
app.get("/api/blog-stats", parseBlogStats, async (req, res) => {
  res.status(req.statusCode)
  res.json(req.blogData)
})

// Sends the search data in form of JSON object with key "searchResult"
app.get("/api/blog-search",searchBlog, async (req, res) => {
  res.status(req.statusCode)
  res.json(req.searchData)
  
})

app.listen(port)