const passportService = require('../services/passport');
const passport = require('passport');
const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });



// router.get('/', function(req, res, next){
//   res.send("you made it to the blog page");
// });

// router.get('/', function(req, res, next){
//   User.
// });

// get blogger and all associated blog posts 
// by user (blogger) id
router.get('/:id', function(req, res) {
	var id = req.params.id;
	console.log("id: ", id);
	User.findById(id)
			.then(function(user) {
			  res.status(200).json({
			    status: 'success',
			    user: user
			  });
			})
			.catch(function (err) {
			  return next(err);
			});
});

// get all post by blogger
// (will use the postId in url to filter on front-end)
router.get('/:id/post/:postId', function(req, res) {
	var id = req.params.id;
	var postId = req.params.postId;
	console.log("id: ", id);
	User.findById(id, {posts: []})
			.then(function(post) {
			  res.status(200).json({
			    // status: 'success',
			    post: post.posts
			  });
			})
			.catch(function (err) {
			  return next(err);
			});
});



// router.put('/:id/post', function (req, res, next) {
//   var post_id = req.params.id;
//   User.findByIdAndUpdate(req.params.id, {$addToSet: {posts: req.body}}, {new:true})
//   .then(function(post) {
//     console.log(post);
//     res.status(200).json({
//       status: 'success',
//       data: post
//     });
//   })
//   .catch(function (err) {
//     return next(err);
//   });
// });


module.exports = router;


























