const passportService = require('../services/passport');
const passport = require('passport');
const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function userToken(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function login(req, res, next) {
  res.send({
  	id: req.user._id,
  	token: userToken(req.user),
  	email: req.user.email,
  	first_name: req.user.first_name,
  	last_name: req.user.last_name,
  	photo_url: req.user.photo_url,
  	posts: req.user.posts
  });
}

function signup(req, res, next){
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password){
		return res.status(422).send({error: "Email and password are required..."});
	}

	User.findOne({email: email}, function(err, existing){
			if(err){
				return next(err);
			}
			if(existing) {
				return res.status(422).send({error: 'That email address is taken!'});
			}

			const user = new User({
				email: email,
				password: password,
				first_name: '',
				last_name: '',
				description: '',
				photo_url: 'http://placehold.it/400x400',
				posts: []
			});

			user.save(function(err){
				if(err){ return next(err); }
				res.json({
					id: user._id,
					token: userToken(user),
					email: user.email,
					photo_url: "http://placehold.it/400x400",
					posts: []
				});
			});
	});
}

// router.get('/', function(req, res, next){
//   User.find({}, function(err, users){
//   	if (err) { return done(err); }
//   	res.json({users: users});
//   });
// });

router.get('/', function(req, res, next){
  User.find({})
  		.then(function(users) {
  		  res.status(200).json({
  		    status: 'success',
  		    users: users
  		  });
  		})
  		.catch(function (err) {
  		  return next(err);
  		});
});

router.post('/login', requireLogin, login);
router.post('/signup', signup);


module.exports = router;

















