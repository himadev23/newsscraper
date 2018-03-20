var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  
  articleName: {
    type: String,
    required: true,
    unique:true,

  },
  
  articleSumm: {
    type: String,
    required: true,
    unique:true
  },
  saved:{
    type: Boolean,
    default:false
  }
  
  /*note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }*/
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;