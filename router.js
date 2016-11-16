// const Authentication = require('./controllers/authentication');
// const passportService = require('./services/passport');
// const passport = require('passport');
// // const User = require('./models/user');

// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });


// module.exports = function(app){
//   app.get('/', function(req, res, next){
//     res.send(['one', 'two', 'thre']);
//   });

//   app.post('/login', requireLogin, Authentication.login);
//   app.post('/signup', Authentication.signup);

// }