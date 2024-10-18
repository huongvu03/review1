var express = require('express');
var router = express.Router();
const Book = require("../models/book.model")

/* GET home page. */
router.get('/', async(req, res)=> {
  try{
    const books= await Book.find()
    res.render('book/index', { books })
  }catch(err){
    console.log(err);
  }
});
router.get('/create', (req, res) => {
  res.render('book/create');
});

router.post('/create', async (req, res) => {
  try{
    const stu = new Book(req.body);
    await stu.save();
    res.redirect("/book");

  }catch(err){
    console.log(err);
  }
    }
);
router.get('/update/:id', async (req, res) => {
  try{
  const  book = await Book.findById(req.params.id);
  res.render("book/update",{book})

  }catch(err){
    console.log(err);
  }
}
);
router.post('/update/:id', async (req, res) => {
  try{
  const  book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/book");

  }catch(err){
    console.log(err);
  }
}
);
router.get('/delete/:id', async (req, res) => {
  try{
  const  book = await Book.findByIdAndDelete(req.params.id);
  res.redirect("/book");

  }catch(err){
    console.log(err);
  }
}
);
module.exports = router;
