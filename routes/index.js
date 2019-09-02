var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.mongoURL, {useNewUrlParser: true});

  var itemSchema = new mongoose.Schema({
    description:  String,
    priceSmall:   Number,
    priceLarge:   Number
  });

  var Item = mongoose.model('Food', itemSchema);

  // creating new data Function
  function saveItemToDb(description,priceSmall,priceLarge){
    var newItem = new Item({description,priceSmall,priceLarge});
    newItem.save(function (err, description) {
      if (err) return console.error(err);
      console.log('Item Saved Successfully');
    });
  }
  var all_items;
 



  // Finding one entry
  function findItem (description){
    Item.find({description});
    console.log(description);
  }

  function deleteItem (description){
    Item.findOneAndDelete({ description}, function (err) {
      console.log(err)
    });
  }

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we\'re connected!");
  });

  Item.find(function (err, Item) {
    if (err) return console.error(err);
    all_items = Item;
    // console.log(all_items);
  });

  setTimeout(function(){
    res.render('index', { title: 'Pepitas',item:all_items });
  },2000);  
});

router.post('/create', function(req, res, next) {
  var description = req.body.description;
  var priceSmall = req.body.smallPrice;
  var priceLarge = req.body.largePrice;

  saveItemToDb(description,priceSmall,priceLarge);
  
  setTimeout(function(){
    res.redirect('/');
  },2000);  
});


router.post('/delete', function(req, res, next) {
  var description = req.body.description;
  deleteItem(description);
  
  setTimeout(function(){
    res.redirect('/admin');
  },2000);  
});

function deleteItem(value){
  Item.findOneAndDelete(value);
}

router.get('/admin', function(req, res, next) {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we\'re connected!");
  });

  Item.find(function (err, Item) {
    if (err) return console.error(err);
    all_items = Item;
    // console.log(all_items);
  });

  setTimeout(function(){
    res.render('admin', { title: 'Pepitas',item:all_items });
  },2000);  
});


module.exports = router;