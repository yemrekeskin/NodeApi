const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const morgan = require('morgan');
const logger = require('./util/logger');


const server = express();

// ********************* STORAGE - FILE
var multer = require('multer');
// var crypto = require('crypto');
var path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });

server.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

// ********************* CONFIG
require('./env.config');

// ********************* LOGGING
// server.use(morgan('tiny'));
// server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// server.use(morgan("combined", { "stream": logger.stream.write }));
server.use(morgan('combined', { stream: logger.stream }));

// ********************* COMPRESSION
// compress all responses
//server.use(compression());

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }

  // fallback to standard compression
  return compression.filter(req, res);
};

server.use(compression({
  // filter decides if the response should be compressed or not, 
  // based on the `shouldCompress` function above
  filter: shouldCompress,
  // threshold is the byte threshold for the response body size
  // before compression is considered, the default is 1kb
  threshold: 0
}));


// **************** MIDDLEWARES
// server.use('/',() => {
//     console.log('This is a middleware running')
// }); 
server.use(cors());
server.use(bodyParser.json());

// ***************** IMPORT ROUTERS
const postsRoute = require('./routers/post.routers');
server.use('/posts', postsRoute);

const authRoute = require('./routers/auth.routers');
server.use('/auth', authRoute);

require('./routers/note.routers')(server);

require('./routers/currency.router')(server);

// ***************** MAIN ROUTERS
server.get('/', (req, res) => {
  res.send('Hello World From NodeApi');
});

server.get('/healthcheck', function (req, res) {
  res.status(200).send();
});

// ***************** DATABASE CONNECTION
// Connect to the Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


// ************************ SERVER UP
// Server listening
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Server up and running on ' + port);
  //console.log(process.env.NODE_ENV);
});
