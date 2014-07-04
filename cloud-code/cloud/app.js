
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  sleep(3000);
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/mellow', function(req, res) {
    res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// Attach the Express app to Cloud Code.
app.listen();
