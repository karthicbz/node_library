var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use('/public', express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = 'mongodb+srv://admin:admin123@cluster0.frh5rdd.mongodb.net/local_library?retryWrites=true&w=majority';
main();

async function main(){
    try{
        const status = await mongoose.connect(mongoDB);
        console.log(status);
    }catch(err){
        console.error('Unable to connect', err);
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
