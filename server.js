const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const server = express();

// Middlewares
// server.use('/',() => {
//     console.log('This is a middleware running')
// }); 
server.use(cors());
server.use(bodyParser.json());

// Imports routers
const postsRoute = require('./routers/post.routers');
server.use('/posts', postsRoute);

const authRoute = require('./routers/auth.routers');
server.use('/auth', authRoute);

require('./routers/note.routers')(server);


// Routes
server.get('/', (req, res) => {
  res.send('Hello World From NodeApi');
});

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


// Server listening
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Server up and running on ' + port);
});
