const express = require('express');
const o2x = require('object-to-xml');
const userInput = require('./estimator');

const app = express();

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

app.use(morgan('commonm', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

app.use(morgan(':method :url :status :response-time ms[0m'));

// pp.use(addRequestId);

// const loggerFormat = ':id [:date[web]]" :method :url" :status :responsetime',


const dataInput2 = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

// morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req,res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join('')
// });

app.use('/api/v1/on-covid-19/xml', (req, res) => {
  // req.accepts('text/xml');
  res.set('Content-Type', 'text/xml');
  // res.type('text/xml');
  const objResult = userInput(dataInput2);
  const dataXml = o2x(objResult);
  // res.send({ result: dataXml });

  res.send(o2x({
    '?xml version="1.0" encoding="utf-8"?' : null,
    clients: { client: objResult }
  }));
  // res.format({
  //   'application/xml': () => res.send({ result: dataInput2 }),
  //   'default': () => res.send({ result: dataInput2 })
  // })
});

app.use('/api/v1/on-covid-19/json', (req, res) => {
  const result = userInput(dataInput2);
  res.json({ result: userInput(dataInput2) });
});

// const formatString = /^(GET|POST)\s+\/api\/v1\/on-covid-19(\/json|\/xml|\/logs)?\s+\d{3}\s+\d{2,}ms$
// app.use(morgan(formatString) => {
//   // morgan(function (tokens, req, res) {
//   //   return [
//   //     tokens.method(req,res),
//   //     tokens.url(req, res),
//   //     tokens.status(req, res),
//   //     tokens.res(req, res, 'content-length'), '-',
//   //     tokens['response-time'](req, res), 'ms'
//   //   ].join('')
//   // });
// });

app.use('/api/v1/on-covid-19', (req, res) => {

  const result = userInput(dataInput2);
  res.json({ result: userInput(dataInput2) });
});

morgan.token()

// morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req,res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join('')
// });

module.exports = app;
