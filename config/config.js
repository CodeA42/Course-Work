const config = {
  development: {
    "PORT": 5000,
    "db": {
      "uri": "mongodb://localhost",
      "PORT": "27017" ,
      "collection": "course_work",
      "models": {
        "articles": "ArticleModel"
      }
    },
    "hashSalt": 8
  },

  present: {
    "PORT": 80
  }
}

module.exports = config[process.env.NODE_ENV.trim()];