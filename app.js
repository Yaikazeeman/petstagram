const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path')

app.set('view engine', 'hbs')
app.set('views', path.join( __dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views','partials'))

app.use(express.static(__dirname + '/public'));

const index = require('./routes/index')
app.use('/', index);


app.listen(3000, () => {console.log("app listening on port 3000")})