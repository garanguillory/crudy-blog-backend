const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router'); // 
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:crudy-blog-server/crudy-blog');

// App
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));


var auth = require('./routes/auth.js');
var user = require('./routes/user.js');

app.use(auth);
app.use('/blog', user);



// router(app);






// Server

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port Andre', port);
