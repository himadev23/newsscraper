var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var cheerio = require("cheerio");
var request = require('request');
var db = require("./models");
var PORT = 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsScraper", {
    //useMongoClient: true
});
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

request('http://ezinearticles.com/?cat=Arts-and-Entertainment', function(err, response, html) {
    var $ = cheerio.load(html);
    //console.log('response',response);
    $('.article').each(function(i, element) {

            var articleLinkName = $(this).children('a').text();
            var articleSummery = $(this).find('.article-summary').text().trim().replace(/\\/g, " ");
            
            var data = {
                articleName: articleLinkName,
                articleSumm: articleSummery
            }
            console.log('data...........', data)
            //if (articleLinkName && articleSummery) {

                db.Article.create(data)
                .then(function(dbArticle) {
                    console.log('dbArticle', dbArticle);
                })
                .catch(function(err) {
                        //response.json(err);
                    console.log('err');
                });
        
    })
});

app.get('/allArticles',function(req,res){
  db.Article.find({}).then(function(dbArticle){
    res.json(dbArticle);
  }).catch(function(err){
    console.log(err);
  })
});




app.get('/', function(req, res) {
    res.render("index");
})

app.put('/save',function(req,res){
  console.log('hjkshadhddd',req.body)
  //db.Article.update({req.body})
})



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});