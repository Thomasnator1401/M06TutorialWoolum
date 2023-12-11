// Require the modules
const express = require('express');
const mongoose = require('mongoose');

// Create the app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node-tutorial', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Define a schema for the blog posts
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date
});

// Create a model for the blog posts
const Post = mongoose.model('Post', postSchema);

// Create a route for the home page
app.get('/', (req, res) => {
  // Find all the blog posts from the database
  Post.find()
    .then(posts => {
      // Render the home page with the posts
      res.render('index', {posts: posts});
    })
    .catch(err => console.error(err));
});

// Create a route for adding a new post
app.post('/new', (req, res) => {
  // Get the data from the request body
  const title = req.body.title;
  const content = req.body.content;
  const date = new Date();

  // Create a new post object
  const post = new Post({
    title: title,
    content: content,
    date: date
  });

  // Save the post to the database
  post.save()
    .then(() => {
      // Redirect to the home page
      res.redirect('/');
    })
    .catch(err => console.error(err));
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
