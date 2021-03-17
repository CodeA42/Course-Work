# Tables
  ```javascript
//Articles
const authorsSchema = mongoose.Schema({
id: String
 }, {_id:false});

const commentSchema = mongoose.Schema({
  id: String
}, {_id: false})

const articleSchema = new mongoose.Schema({
 title: String,
 body: String,
 postDate: {type: Date, default: Date.now},
 authors: [authorsSchema],
 postedBy: String, //id
 comments: [commentSchema]
});
  ```
  
  
  ```javascript
//Users
const userSchema = new mongoose.Schema({
username: String,
password: String,
created: {type: Date, default: Date.now},
articles: [String] //id
});
  ```
  
  ```javascript
  //Comments
  const commentSchema =new mongoose.Schema({
  body: String,
  postedBy: String, //id
  created: {type: Date, default: Date.now},
  articleId: String
});
  ```
