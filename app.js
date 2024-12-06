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

// ZeroMQ
const zmq = require('zeromq');

const msa = new zmq.Request(); // Microservice A - rng
msa.connect('tcp://10.0.0.75:5555');
console.log('Connected to Microservice A');

const msb = new zmq.Request(); // Microservice B - game eval
msb.connect('tcp://10.0.0.75:13760');
console.log('Connected to Microservice B');

const msc = new zmq.Request(); // Microservice C - elements
msc.connect('tcp://10.0.0.75:13759');
console.log('Connected to Microservice C');

const msd = new zmq.Request(); // Microservice D - feedback
msd.connect('tcp://10.0.0.75:13758');
console.log('Connected to Microservice D');


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

// RNG check
app.post('/rng', async (req, res) => {
    const mode = '1'; // rng mode for the microservice
    const combos = '4'; // total number of spots to generate for

    // mode
    console.log("(MSA) sending", mode);
    await msa.send(mode);

    let reply = await msa.receive();
    reply = reply.toString();

    console.log("(MSA) received", reply);

    // combos and then returned rng
    console.log("(MSA) sending", combos);
    await msa.send(combos);

    let rng_arr = await msa.receive();
    rng_arr = rng_arr.toString();
    console.log("(MSA) received", rng_arr);

    return res.json(rng_arr);
})

// Player move processing
app.post('/move', async (req, res) => {
    const positionID = req.body.positionID;
    const jobSelect = req.body.jobSelect;
    const positionSelect = req.body.positionSelect;
    const chains = req.body.chains;

    // position data
    console.log("(MSB) sending", positionID, jobSelect, positionSelect, chains);
    await msb.send(positionID, jobSelect, positionSelect, chains);
    const reply = await msb.receive();
    console.log("(MSB) received", reply);

    return res.json({reply: reply.toString()});
})

// Elements movement

// Player feedback processing

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});