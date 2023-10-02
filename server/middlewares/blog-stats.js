// External Imports
require("dotenv").config({ path: "server/.env" })
const lodash = require('lodash');

// Constants
const BLOG_URL = "https://intent-kit-16.hasura.app/api/rest/blogs"
const option = {
    headers: { "x-hasura-admin-secret": process.env.BLOG_STATS_SECRET, "Content-Type": "application/json" }
}

function analyseBlogData(blogs) {

    const totalBlogs = blogs.length

    const blogWithLongestTitle = lodash.maxBy(blogs, blog => blog.title.length)

    const blogsWithPrivacy = lodash.filter(blogs,
        blog => lodash.includes(blog.title.toLowerCase(), "privacy")
    ).length

    const uniqueBlogTitles = lodash.uniqBy(
        lodash.map(blogs, "title")
    )


    return { totalBlogs, blogWithLongestTitle, blogsWithPrivacy, uniqueBlogTitles }
}


const parseBlogStats = async (request, response, next) => {


    try {
        // Fetches the Data from the API
        const res = await fetch(BLOG_URL, option)
        const responseJson = await res.json()
        request.statusCode = 200
        request.blogData = analyseBlogData(responseJson.blogs)
    }
    catch (error) {
        console.log(error)
        // Error can only occur if the api fails.
        request.statusCode = 500
        request.blogData = { "Error": "Internal Server Error. Service will be corrected shortly" }
    }
    next()
}

exports.parseBlogStats = parseBlogStats
