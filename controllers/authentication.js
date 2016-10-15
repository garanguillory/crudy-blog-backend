const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function userToken(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.login = function(req, res, next) {
	
  res.send({
  	id: req.user._id,
  	token: userToken(req.user),
  	email: req.user.email,
  	first_name: req.user.first_name,
  	last_name: req.user.last_name,
  	photo_url: req.user.photo_url
  });
}

exports.signup = function(req, res, next){
	
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
				photo_url: 'http://placehold.it/400x400'
			});

			user.save(function(err){
				if(err){ return next(err); }
				res.json({
					id: user._id,
					token: userToken(user),
					email: user.email,
					photo_url: "http://placehold.it/400x400"
				});
			});
	});
};

