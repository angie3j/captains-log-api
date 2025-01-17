// Dependencies
const { response } = require('express');
const express = require('express');

// A new controller that handles a sub-route.
const logs = express.Router();

// Files
const logsArray = require('../models/log');

// Routes
// Sends the logs array:
logs.get('/', (request, response) => {
    // console.log('GET request to/logs');
    response.json(logsArray);
});

// SHOW
// Sends a redirect when an individual index is given:
logs.get('/:arrayIndex', (request, response) => {
    const arrayIndex = request.params;
    if (logsArray[arrayIndex]) {
        response.json(logsArray[arrayIndex]);
    } else {
        response.redirect('/404');
    }
});

// UPDATE 
// Replaces the index in the logs array:
logs.put('/:arrayIndex', (request, response) => {
    const arrayIndex = request.params;
    logsArray[arrayIndex] = request.body;
    response.status(200).json(logsArray[arrayIndex]);
});

// CREATE
// Adds new log to the end of logs' array:
logs.post('/', (request, response) => {
    const newLog = request.body;
    logsArray.push(newLog)
    console.log(newLog)
    response.json(logsArray);
    response.send(request.body);
  });

   // DELETE
  // Deletes at the index in the logs array:
  logs.delete('/:index', (request, response) => {
    const { index } = request.params;
    // console.log(bookmarksArray)
    if(logsArray[index]) {
      // logsArray.filter( (log, i) => index !== i )
      const deletedLog = logsArray.splice(index, 1)[0]
      response.status(200).json(deletedLog);
    } else {
      response.status(404).json({ error: 'Page Not Found' })
    }
  })


module.exports = logs;