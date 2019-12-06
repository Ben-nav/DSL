// importing express
const express = require('express');

// create a web application as an instance of express()
const app = express();

// use the node filesystem to write to a file
const fs = require('fs');

// listen! the listen() function takes two arguments
// 1. a port on which to listen
// 2. a callback function i.e. what to do when a request arrives through this port
app.listen(3000, () => console.log('listening on 3000'));

// use the static function of the express library.
// the function takes a file or a directory as a parameter
app.use(express.static('public'));

// give the server the ability to received and parse json
// options are passed as argusments e.g. no json file bigger than 1mb
app.use(express.json({limit: '1mb'}));

// create a route to 'api" via the the POST method
// request has all the http request from the client
// response is the variable the server will send back to the client
app.post('/api', (request,response) => {
    // Console.log the request from the client to the server console to check
    console.log('I got a request!');
    console.log(request.body);

    const data = request.body
    // stringify the json data
    // parameter 'null' and '2' format json data
    json = JSON.stringify(data, null, 2);
    // write strinified jason data to file
    fs.appendFile('./data/geolocation_data.json', json, ()=> console.log('wrote to file'));

    // complete the response
    response.json({
        status: 'success',
        latitude: request.body.lat,
        longitude: request.body.lon
    });
}); 