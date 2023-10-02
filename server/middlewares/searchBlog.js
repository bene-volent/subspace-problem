// External Imports
require("dotenv").config({ path: "server/.env" })
const lodash = require('lodash');

// Constants
const BLOG_URL = "https://intent-kit-16.hasura.app/api/rest/blogs"
const option = {
    headers: { "x-hasura-admin-secret": process.env.BLOG_STATS_SECRET, "Content-Type": "application/json" }
}

async function searchBlog(req, res, next) {

    let searchKeyword = req.query.query

    // If query is empty
    if (searchKeyword === "") {
        req.statusCode = 204
        req.searchData = { "searchResult": [] }
    }

    // If no query is used
    else if (searchKeyword === undefined) {
        req.statusCode = 400
        req.searchData = {"Error": 'Incorrect search query. Use (query) keyword to search for blogs'}
    }

    else {
        searchKeyword = searchKeyword.toLowerCase()

        try {
            const res = await fetch(BLOG_URL, option)
            const responseJson = await res.json()
            const blogs = responseJson.blogs
            req.statusCode = 200
            req.searchData = { "searchResult": lodash.filter(blogs, blog => lodash.includes(blog.title.toLowerCase(), searchKeyword)) }
        }
        catch (error) {
            req.statusCode = 500
            req.searchData = { "Error": "Internal Server Error. Service may be" }
        }

    }

    next()
}

exports.searchBlog = searchBlog