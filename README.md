# Blog API Documentation

## Base URL
`https://ping-server-2.onrender.com`

## Endpoints & Usage

### 1. Get All Blogs
**URL:** `/getAllBlogs`
**Method:** `GET`
**Response:**
```json
[
  {
    "_id": "blogId",
    "title": "Blog Title",
    "description": "Short description",
    "likes": [],
    "coverImgUrl": "http://image.url",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 2. Get One Full Blog
**URL:** `/getOneFullBlog`
**Method:** `POST`
**Body:**
```json
{ "blogId": "blogIdHere" }
```
**Response:**
```json
{
  "_id": "blogId",
  "title": "Blog Title",
  "coverImgUrl": "http://image.url",
  "description": "Short description",
  "content": "Full blog content",
  "author": "userId",
  "comments": [],
  "likes": []
}
```

---

### 3. Create Blog
**URL:** `/createBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
- Content-Type: `application/json`
**Body:**
```json
{
  "title": "Blog Title",
  "coverImgUrl": "http://image.url",
  "description": "Short description",
  "content": "Full blog content"
}
```
**Response:**
```json
{ "message": "Blog created" }
```

---

### 4. Like a Blog
**URL:** `/addLikeBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Body:**
```json
{ "blogId": "blogIdHere" }
```
**Response:**
```json
{ "message": "Liked" }
```

---

### 5. Comment on Blog
**URL:** `/addCommentBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Body:**
```json
{
  "blogId": "blogIdHere",
  "message": "Nice blog!"
}
```
**Response:**
```json
{ "message": "Comment added" }
```

---

### 6. Delete a Comment
**URL:** `/deleteCommentBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Body:**
```json
{
  "blogId": "blogIdHere",
  "commentId": "commentIdHere"
}
```
**Response:**
```json
{ "message": "Comment deleted" }
```

---

### 7. Update a Blog
**URL:** `/updateBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Body:**
```json
{
  "blogId": "blogIdHere",
  "title": "Updated Title",
  "coverImgUrl": "http://updated.image.url",
  "description": "Updated description",
  "content": "Updated blog content"
}
```
**Response:**
```json
{ "message": "Blog updated" }
```

---

### 8. Get My Blogs
**URL:** `/getMyBlogs`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Response:**
```json
[
  {
    "_id": "blogId",
    "title": "My Blog Title",
    "description": "My blog description",
    "coverImgUrl": "http://image.url",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 9. Delete a Blog
**URL:** `/deleteBlog`
**Method:** `POST`
**Headers:**
- Authorization: Bearer `<your_token>`
**Body:**
```json
{
  "blogId": "blogIdHere"
}
```
**Response:**
```json
{ "message": "Blog deleted" }
```

