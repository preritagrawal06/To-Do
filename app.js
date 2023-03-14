require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const todoRouter = require('./routes/todo');
const userRouter = require('./routes/user');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = process.env.MONGODB_URI;


const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res, next)=>{
    next();
})
app.use(
    session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, store: store})
);

app.use(userRouter);
app.use(todoRouter);

mongoose
    .connect(MONGODB_URI)
    .then(()=>{
        app.listen(process.env.PORT);
        console.log("connected to DB");
    })
    .catch(err=>{
        console.log(err);
    })