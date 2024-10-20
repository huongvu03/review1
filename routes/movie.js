var express = require('express');
var router = express.Router();
const Movie = require("../models/movie.model")


// Route để lấy danh sách phim theo thể loại
router.get('/', async (req, res) => {
  const category = req.query.category;
  let movies;

  if (category) {
      movies = await Movie.find({ category });
  } else {
      movies = await Movie.find();
  }

  res.render('movie/index', { movies, category });
});
// Route cho thể loại Action
router.get('/action', async (req, res) => {
  const moviesCate = await Movie.find({ category: 'Action' });
  res.render('movie/index', { moviesCate, category: 'Action' });
});

// Route cho thể loại Comedy
router.get('/comedy', async (req, res) => {
  const moviesCate = await Movie.find({ category: 'Comedy' });
  res.render('movie/index', { moviesCate, category: 'Comedy' });
});

// Route cho thể loại Drama
router.get('/drama', async (req, res) => {
  const moviesCate = await Movie.find({ category: 'Drama' });
  res.render('movie/index', { moviesCate, category: 'Drama' });
});
// router.get('/details/:id', async (req, res) => {
//   try{
//   const  movie = await Movie.findById(req.params.id);
//   res.render("movie/index",{movie})

//   }catch(err){
//     console.log(err);
//   }
// }
// );

router.get('/create', (req, res) => {
  res.render('movie/create');
});
router.post('/create',async(req,res)=>{
  const movies = new Movie(req.body);
   try{
     await movies.save();
     res.redirect("/movie");
   }catch(err){
     console.log(err);
   }
 })

// Serve book-seats-form.html
router.get("/bookseat", (req, res) => {
  res.render('movie/bookseat');
  });
  // Serve delete-movie-form.html
  router.get('/delete', async(req, res)=> {
    try{
      const movies= await Movie.find();
      res.render('movie/delete', {movies})
    }catch(err){
      console.log(err);
    }
  });

  router.post('/delete', (req, res) => {
    const movieId = req.body._id; // Lấy movieId từ request body

    // Kiểm tra nếu movieId không được cung cấp
    if (!movieId) {
        return res.status(400).send('Missing movieId');
    }

    // Sử dụng Mongoose để xóa phim theo movieId
    Movie.findByIdAndDelete(movieId)
        .then(deletedMovie => {
            if (!deletedMovie) {
                return res.status(404).send('Movie not found');
            }
            //res.status(200).send('Movie deleted successfully');
            res.redirect("/movie");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
});
// Serve update-seats-form.html
  router.get('/update', async(req, res)=> {
    try{
      const movies= await Movie.find();
      res.render('movie/update', {movies})
    }catch(err){
      console.log(err);
    }
  });
  router.post('/update', (req, res) => {
    const movieId = req.body._id; // Lấy movieId từ request body
    const availableSeats = req.body.availableSeats; // Lấy số ghế có sẵn

    // Kiểm tra nếu movieId hoặc availableSeats không được cung cấp
    if (!movieId || !availableSeats) {
        return res.status(400).send('Missing movieId or availableSeats');
    }

    // Thực hiện cập nhật với movieId và availableSeats
    Movie.findByIdAndUpdate(movieId, { availableSeats }, { new: true })
        .then(updatedMovie => {
            if (!updatedMovie) {
                return res.status(404).send('Movie not found');
            }
            //res.status(200).send('Seats updated successfully');
            res.redirect("/movie");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
});


module.exports = router;
