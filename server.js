import express from 'express';
const app = express();
import { config } from 'dotenv';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './server/routes/router.js'

config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));
// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));
// set view engine
app.set("view engine", "ejs");

// load assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/css",express.static(resolve(__dirname,"assets/styles")));
app.use("/js",express.static(resolve(__dirname,"assets/scripts")));
app.use("/img",express.static(resolve(__dirname,"assets/images")));


// app.use('/', require('./server/routes/router.js').default);
app.use('/', router);

// LISTENING SERVER
app.listen(PORT, ()=>{
    console.log(`Serving is running on http://localhost:${PORT}`);
});

// Types of routes: get (get data), post (send data), delete, patch (update data)

