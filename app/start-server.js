//require('angular')
//set up
var express = require('express')
var app = express()
var mongoose = require('mongoose') //mongoose for mongodb
var morgan = require('morgan') //log requests to the console
var bodyParser = require('body-parser') //pull information from HTML POST
var methodOverride = require('method-override') //simulate DELETE and PUT

mongoose.connect('mongodb://localhost:27017')

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



app.listen(8080,function() {
  console.log("Server started on Port 8080")
})


//define model
var Todo = mongoose.model('Todo', {text:String}) //this defines a name and a schema


//routes
//takes a path and a callback function
//req is the object that has properties of the request query string, paramaters, body, HTTP headers, etc.
//res is the object that represents the HTTP response
app.get('/api/todos',function(req,res) {
  // //use mongoose to get all the todos in the db
  Todo.find(function(err,todos) {
    if(err)
      res.send(err)
    res.json(todos) //sends a json response
  })
})

app.post('/api/todos',function(req,res) {
  // saves document to db

  Todo.create({
      text: req.body.text,
      done:false
  }, function(err,todo) {
    if(err)
      res.send(err);
      //get and return all the todos after you create another todo

  })
  // //query db
  Todo.find(function(err,todos) {
    if(err)
      res.send(err)
    res.json(todos)
  })
})

app.delete('/api/todos/:todo_id',function(req,res) {
  Todo.remove({
      _id : req.params.todo_id
  }, function(err, todo) {
      if(err)
        res.send(err)
  })
  Todo.find(function(err,todos) {
    if(err)
      res.send(err)
    res.json(todos)
  })
})


//application

app.get('*',function(req,res) {
  res.sendfile('./public/index.html')
})
