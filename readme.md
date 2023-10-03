# Subspace Internship Problem

### Run Test

```terminal
npm install
npm run dev
```

### Tools required

- Node
- NPM
- Express.js
- Lodash
- Dotenv

## Problem Statement: Blog Analytics with Express and Lodash

### Problem Division

1. __Data Retrieval__

    Using Fetch api, created a GET request with the secret in header.

2. __Data Analysis__

    - [x] Calculate total number of blogs fetched: ```Array.prototype.length```
    - [x] Find the blog with longest title: ```Lodash.maxBy(...)```
    - [x] Determine the number of blogs with titles containing the word "privacy.": ```Lodash.filter(...,(...)=>lodash.includes(...),"privacy")```
    - [x] Create an array of unique blog titles (no duplicates).: ```lodash.uniqBy(
        lodash.map(blogs, "title")
    )```

3. __Response__
    - [x] Total number of blogs.
    - [x] The title of the longest blog.
    - [x] Number of blogs with "privacy" in the title.
    - [x] An array of unique blog titles.

4. __Blog Search Endpoint__

   - [x] Create an additional route at `/api/blog-search`.

   - [x] This route should accept a query parameter, e.g., `/api/blog-search?query=privacy`.

   - [x] Implement a search functionality that filters the blogs based on the provided query string (case-insensitive).

5. __Error Handling__:
   - [x] Handle any errors that may occur during the data retrieval, analysis, or search process. If the third-party API is unavailable or returns an error, respond with an appropriate error message.

6. __Curls of API__
   - curl --request GET \
  --url https://subspace-problem.vercel.app/api/blog-stats
   - curl --request GET \
  --url https://subspace-problem.vercel.app/api/blog-search?query=[search-query]