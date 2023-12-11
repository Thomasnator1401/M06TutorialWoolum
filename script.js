// Connecting to MongoDB using mongoose
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mydb';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));

// Creating a schema and a model for a blog post
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

// Saving a new blog post to the database
const blog = new Blog({
  title: 'My first blog post',
  snippet: 'This is a short summary of my blog post',
  body: 'This is the full content of my blog post'
});

blog.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
// Retrieving all blog posts from the database
Blog.find()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
// Retrieving a specific blog post by its ID  
