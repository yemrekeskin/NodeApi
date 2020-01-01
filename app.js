const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config')

// Middlewares
// app.use('/',() => {
//     console.log('This is a middleware running')
// }); 
app.use(bodyParser.json());

// Imports routers
const postsRoute = require('./routers/posts');
app.use('/posts',postsRoute);

// Routes
app.get('/', (req,res) => {
    res.send('Hello World')
});

// Connect to the Database
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true },     
    () => console.log('Connected to Db')
);


// Server listening
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server Listening on '+ port);
});
