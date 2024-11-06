// SETUP

// Express
var express = require('express' );   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());            // JSON parsing
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));  // Setting directory
PORT        = 13671;                // Port number

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// ROUTES

// Get page

// Index
app.get('/', function(req, res)
{
    return res.render('index');
})

app.get('/guide', function(req, res)
{
    return res.render('guide');
})

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});