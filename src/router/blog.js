// const blog = require('express').Router();
// const Blog = require('../models/blog');
// title: { type: String },
//   coverImgUrl: { type: String },
//   description: { type: String },
//   author: { type: String },
//   content: { type: String },
//   processedContent: { type: String },
//   comments: [
//     {
//       user: String,
//       text: String,
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// platform: {
//     type: String,
//     required: [true, 'Platform is required.'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required.'],
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: isEmail,
//       message: 'Invalid email format.',
//     },
//   },
//   userName: {
//     type: String,
//     trim: true,
//   },
//   password: {
//     type: String,
//   },
//   fullName: {
//     type: String,
//     trim: true,
//   },
//   profileUrl: {
//     type: String,
//     trim: true,

//   },

// userCookie 'token'
// const tokenByUser = req.cookies?.token;
//     const userid = await jwt.verify(tokenByUser,"process.env.SECRET"); //this is the real secreat no other
//     const user = await User.findById(userid);

//informations
//all block of code need to be exeption handled validated sanitaized properly with limits routes are arranged in good  order all error messages are in same {message:""} each and every logics are properly writen

// blog.get('/getAllBlogs'); //return All the blogs (array of  objects as response including blog _id,title,discription,likes,coverImgUrl,updatedAt)
// blog.get('/getONeFullBlog');//req.body have blogId return the blog completly all feilds in schema as json
// blog.post('/createBlog');// req.body have title,coverImgUrl,discription,content then author: from token get the userObj store the object here (userName,fullName,email,profileUrl) and  comments ,likes empty ,createdAt = now,updatedAt=now
// blog.post('/addLikeBlog');//req.body have blogId get userId from token and add that id in that blogs like as array eg:[userId1,userId2] if userAlready liked dont update
// blog.post('/addCommentBlog');//req.body have blogId , message get userId from token store this in that blog comment {commentId:(from 0 to ..n)userId,message} in comment array
// blog.post('/deleteCommentBlog');//req.body have blogId , commentId remove that comment
// blog.post('/updateBlog');//req.body have new {title,coverImgUrl,discription,content} update updateAt
// blog.post('/getMyBlogs'); //get userId from token and return array of all blogs with that userId

// module.exports=blog;

//server : https://ping-server-2.onrender.com

// **Postman Test Cases for Blog API**

// ---

// ### 1. Create Blog
// **URL:** `http://localhost:3000/createBlog`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// - Content-Type: `application/json`
// **Body (JSON):**
// ```json
// {
//   "title": "Blog Title",
//   "coverImgUrl": "http://image.url",
//   "description": "Short description",
//   "content": "Full blog content"
// }
// ```
// **Expected Response:**
// ```json
// { "message": "Blog created" }
// ```

// ---

// ### 2. Get All Blogs
// **URL:** `http://localhost:3000/getAllBlogs`
// **Method:** `GET`
// **Expected Response:**
// ```json
// [
//   {
//     "_id": "blogId",
//     "title": "Blog Title",
//     "description": "Short description",
//     "likes": [],
//     "coverImgUrl": "http://image.url",
//     "updatedAt": "2024-01-01T00:00:00.000Z"
//   }
// ]
// ```

// ---

// ### 3. Get One Full Blog
// **URL:** `http://localhost:3000/getOneFullBlog`
// **Method:** `POST`
// **Body (JSON):**
// ```json
// { "blogId": "blogIdHere" }
// ```
// **Expected Response:**
// ```json
// {
//   "_id": "blogId",
//   "title": "Blog Title",
//   "coverImgUrl": "http://image.url",
//   "description": "Short description",
//   "content": "Full blog content",
//   "author": "userId",
//   "comments": [],
//   "likes": []
// }
// ```

// ---

// ### 4. Like a Blog
// **URL:** `http://localhost:3000/addLikeBlog`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// **Body (JSON):**
// ```json
// { "blogId": "blogIdHere" }
// ```
// **Expected Response:**
// ```json
// { "message": "Liked" }
// ```

// ---

// ### 5. Comment on Blog
// **URL:** `http://localhost:3000/addCommentBlog`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// **Body (JSON):**
// ```json
// {
//   "blogId": "blogIdHere",
//   "message": "Nice blog!"
// }
// ```
// **Expected Response:**
// ```json
// { "message": "Comment added" }
// ```

// ---

// ### 6. Delete a Comment
// **URL:** `http://localhost:3000/deleteCommentBlog`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// **Body (JSON):**
// ```json
// {
//   "blogId": "blogIdHere",
//   "commentId": 0
// }
// ```
// **Expected Response:**
// ```json
// { "message": "Comment deleted" }
// ```

// ---

// ### 7. Update a Blog
// **URL:** `http://localhost:3000/updateBlog`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// **Body (JSON):**
// ```json
// {
//   "blogId": "blogIdHere",
//   "title": "Updated Title",
//   "coverImgUrl": "http://updated.image.url",
//   "description": "Updated description",
//   "content": "Updated blog content"
// }
// ```
// **Expected Response:**
// ```json
// { "message": "Blog updated" }
// ```

// ---

// ### 8. Get My Blogs
// **URL:** `http://localhost:3000/getMyBlogs`
// **Method:** `POST`
// **Headers:**
// - Authorization: Bearer `<your_token>`
// **Expected Response:**
// ```json
// [
//   {
//     "_id": "blogId",
//     "title": "My Blog Title",
//     "description": "My blog description",
//     "coverImgUrl": "http://image.url",
//     "updatedAt": "2024-01-01T00:00:00.000Z"
//   }
// ]
// ```




const blog = require('express').Router();
const Blog = require('../models/blog');
const { auth } = require('../middlewares/loginAuth');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

blog.get('/getAllBlogs', async (req, res) => {
  try {
    const blogs = await Blog.find(
      {},
      '_id title description likes coverImgUrl updatedAt author'
    );
    res.json(blogs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.get('/getMyInfo',auth, async (req, res) => {
  try { 
    res.json({
      UserId: req.user._id,
      fullName: req.user.fullName,
      userName: req.user.userName,
      profileUrl: req.user.profileUrl,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/getOneFullBlog', async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).json({ message: 'Invalid blog ID' });
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/createBlog', auth, async (req, res) => {
  try {
    const { title, coverImgUrl, description, content } = req.body;
    if (!title || !description || !content)
      return res.status(400).json({ message: 'Missing fields' });
    const newBlog = new Blog({
      title,
      coverImgUrl,
      description,
      content,
      author: [ 
        {
          UserId: req.user._id,
          fullName: req.user.fullName,
          userName: req.user.userName,
          profileUrl: req.user.profileUrl,
        }], 
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/addLikeBlog', auth, async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).json({ message: 'Invalid blog ID' });
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    const userId = req.user._id;

    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter((id) => !id.equals(userId));
      await blog.save();
      return res.json({ message: 'Like removed' });
    }

    blog.likes.push(userId);
    await blog.save();
    res.json({ message: 'Liked' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


blog.post('/addCommentBlog', auth, async (req, res) => {
  try {
    const { blogId, message } = req.body;
    if (!isValidObjectId(blogId) || !message)
      return res.status(400).json({ message: 'Invalid input' });
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.comments.push({
      user: req.user._id,
      text: message,
      createdAt: new Date(),
    });
    await blog.save();
    res.json({ message: 'Comment added' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/deleteCommentBlog', auth, async (req, res) => {
  try {
    const { blogId, commentId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).json({ message: 'Invalid blog ID' });
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.comments = blog.comments.filter((c, i) => i !== commentId);
    await blog.save();
    res.json({ message: 'Comment deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/updateBlog', auth, async (req, res) => {
  try {
    const { blogId, title, coverImgUrl, description, content } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).json({ message: 'Invalid blog ID' });
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId, author: req.user._id },
      { title, coverImgUrl, description, content, updatedAt: new Date() },
      { new: true }
    );
    if (!blog)
      return res
        .status(403)
        .json({ message: 'Unauthorized or blog not found' });
    res.json({ message: 'Blog updated' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/deleteBlog', auth, async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).json({ message: 'Invalid blog ID' });
    const blog = await Blog.findOneAndDelete({
      _id: blogId,
      author: req.user._id,
    });
    if (!blog)
      return res
        .status(403)
        .json({ message: 'Unauthorized or blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

blog.post('/getMyBlogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id });
    res.json(blogs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = blog;
