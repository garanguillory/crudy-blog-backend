const passportService = require('../services/passport');
const passport = require('passport');
const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// after signup or login
// get all blog posts + blogger's info
router.get('/:id', requireAuth, function(req, res) {
	var id = req.params.id;
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


// add blog post
router.put('/:id/post', requireAuth, function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndUpdate(id, {$addToSet: {posts: req.body}}, {new:true})
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'post added',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// view individual blog post
// will need to filter on the front-end (removed /:postId)
router.get('/:id/post', requireAuth, function(req, res) {
	var id = req.params.id;
	// var postId = req.params.postId;
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

// edit blog post
router.put('/:id/post/:postId/edit', requireAuth, function (req, res, next) {
  var id = req.params.id;
  var postId = req.params.postId;
  User.findOneAndUpdate({"_id": id, "posts._id": postId}, 
  	{$set: {"posts.$.text": req.body.text}}, {new:true})
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'post edited',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// delete blog post
router.put('/:id/post/:postId/delete', requireAuth, function (req, res, next) {
  var id = req.params.id;
  var postId = req.params.postId;
  User.findByIdAndUpdate(id, {$pull: {posts: {"_id": postId}}}, {new:true})
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'post deleted',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// create blogger is done via signup
// need to redirect from sign up to /blogger/:id


// view (self) individual blogger


// edit (self) individual blogger


// delete (self) individual blogger












module.exports = router;