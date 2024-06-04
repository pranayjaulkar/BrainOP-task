const Post = require("../models/post");

/**
 * Fetch all posts from the database and paginate them.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
module.exports.getPosts = async (req, res) => {
  // extract limit and page from from query
  let { limit, page } = req.query;
  page = page || 1;
  limit = limit || 8;
  // calculate start index for pagination
  const startIndex = (page - 1) * limit;
  // Find all posts in the database and sort them by descending order of their IDs.
  // Skip documents to the start index for pagination.
  // Limit the number of documents returned to the specified limit.
  // Populate the 'author' field with the author field excluding the password field.
  const posts = await Post.find()
    .sort("-_id")
    .skip(startIndex)
    .limit(limit)
    .populate("author", "-password");

  res.status(200).json(posts);
};
