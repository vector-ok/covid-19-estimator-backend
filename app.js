const express = require('express');
const o2x = require('object-to-xml');
const userInput = require('./estimator.js');

const app = express();

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

app.use(morgan(':method :url :status :response-time ms[0m'));


// const dataInput2 = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

// let dataParsed;
//
// console.log(userInput(dataInput2));
//
// // let dataInput2;

app.use('/api/v1/on-covid-19/xml', (req, res) => {
  // req.accepts('text/xml');
  res.set('Content-Type', 'text/xml');
  // res.type('text/xml');
  const objResult = userInput();
  res.send(o2x({
    '?xml version="1.0" encoding="utf-8"?' : null,
    clients: { client: objResult }
  }));
});

app.use('/api/v1/on-covid-19/json', (req, res) => {
  const result = userInput(dataInput2);
  res.json({ result: userInput() });
});

app.use('/api/v1/on-covid-19', (req, res) => {

  const result = userInput();
  res.json({ result: userInput() });
});

module.exports = app;
