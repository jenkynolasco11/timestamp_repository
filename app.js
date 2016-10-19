var express = require('express'),
	path = require('path'),
	app = express(),
	port = process.env.PORT;

app.get('/',function(req,res){
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({
      'unix' : null,
      'natural' : null,
    }));
});

app.param('value', function(req,res,next,value){
  var unix_regex = /\d{10,}/;
  var date_regex = /(\w{3,10})\s(\d{1,2})\,\s(\d{1,4})/;

  if(unix_regex.test(value)) {req.date = value; console.log('it matched an unix value!');}
  else if(date_regex.test(value)) {req.date = new Date(value).getTime(); console.log('it matched a date!!');}
  else {req.date = '';  console.log('it didn\'t match any date...');}

  next();
});

app.get('/:value',function(req,res){
  if(req.date) {
  	var months = {
  		  1 : 'January',
  		  2 : 'February',
  		  3 : 'March',
  		  4 : 'April',
  		  5 : 'May',
  		  6 : 'June',
  		  7 : 'July',
  		  8 : 'August',
  		  9 : 'September',
  		  10: 'October',
  		  11: 'November',
  		  12: 'December',
  		},
  		date = new Date(+req.date),
  		day = ('0' + date.getUTCDate()).slice(-2),
  		month = months[date.getUTCMonth() + 1],
  		year = date.getUTCFullYear();
    }

  	res.setHeader('Content-Type','application/json');
  	res.end(JSON.stringify({
  			'unix' : req.date || null,
  			'natural' : req.date ? month + ' ' + day + ', ' + year : null,
  		}));
});

console.log('starting server at port ' + (port || 8001) + '...');
app.listen( port || '8001');
