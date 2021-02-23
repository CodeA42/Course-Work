const authorsSchema = mongoose.Schema({
  fullName: String
 }, {_id:false});

const articleSchema = new mongoose.Schema({
 title: String,
 body: String,
 authors: [authorsSchema]
});

mongoose.model('ArticleModel', articleSchema);