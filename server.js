// Export Modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//Object from modules

// partials
hbs.registerPartials(__dirname+'/views/partials');

// select view engine for hbs
app.set('view engine','hbs');

// Express Middleware

//test middleware
app.use((req,res,next)=>{
  var date = new Date().toString();
  var log = `${date} : Method : ${req.method}, URL : ${req.url}`;//at each refresh page it print date in console
  console.log(log);
  fs.appendFile('server-log.log',log+'\n',(error)=>{
    if(error){
      console('Unable to append to server-log file');
    }
  });
  next();
});

// Maintanance Middleware
app.use((req,res,next)=>{
  res.render('maintanance.hbs');
});

//static page if it kept above Maintanance Middleware then this page will run even in maintanance mode 
app.use(express.static(__dirname + '/public'));

// helper for making reuse of code
hbs.registerHelper('getCurYear',()=>{
  return new Date().getFullYear();
});

// helper for function test
hbs.registerHelper('getHeader',(someText)=>{
  return someText.toUpperCase();
});

// Webserver to listen 3000
app.listen(3000,()=>{
  console.log("Server is running in 3000 port");
});

// route

app.get('/',(req,res)=>{
  res.render('index.hbs',{
    pageTitle: 'Welcome to home Page',
    welcomeMsg: 'hello to Home Page',
    arr:[
      1,
      2,
      3]
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'Welcome to About Page',
  });
});

app.get('/bad',(req,res)=>{
  res.send({error : "Unable to Access"});
});
