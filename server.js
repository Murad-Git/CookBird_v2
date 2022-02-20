const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));
// parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}));
// set view engine
app.set("view engine", "ejs");

// load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/styles")));
app.use("/js",express.static(path.resolve(__dirname,"assets/scripts")));
app.use("/img",express.static(path.resolve(__dirname,"assets/images")));


app.use('/', require('./server/routes/router.js'));

// LISTENING SERVER
app.listen(PORT, ()=>{
    console.log(`Serving is running on http://localhost:${PORT}`);
});

// Types of routes: get (get data), post (send data), delete, patch (update data)

