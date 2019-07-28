const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.set('view engine', 'hbs')
app.set('views', path.join( __dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views','partials'))

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost/petstagram', { useNewParser: true})
    .then((x) => {
        console.log(`database name: ${x.connections[0].name}`);
    }).catch(err => {
        console.log('error', err);

    });

const index = require('./routes/index')
app.use('/', index);
const login = require('./routes/login')
app.use('/', login);
const signup = require('./routes/signup')
app.use('/', signup);
const create = require('./routes/create')
app.use('/', create);
const profilepage = require('./routes/profilepage')
app.use('/', profilepage);
//why can't I define pages here?? 


app.listen(3000, () => {console.log("app listening on port 3000")})