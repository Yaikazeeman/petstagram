require('dotenv').config();

const express    = require('express');
const app        = express();
const hbs        = require('hbs');
const path       = require('path')
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const multer     = require('multer');
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const cloudinary = require('cloudinary').v2
// const imageController = require('./imageController');
// const upload = require('./cloudinaryUploads/multer');
// var cloudiRouter = require('../imageRoutes');

app.set('view engine', 'hbs')
app.set('views', path.join( __dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views','partials'))

// app.use('/uploads', express.static('uploads'))

app.use(express.static(path.join(__dirname, 'public')));

//hbs helper if_eq
hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

//cloudinary setup
// cloudinary.uploader.upload_stream(
//     { agent: myAgent },
//     function(error, result) { console.log(result); }
//   );

// cloudinary.config({ 
// cloud_name: process.env.CLOUD_NAME, 
// api_key: process.env.API_KEY, 
// api_secret: process.env.API_SECRET 
// });

// exports.uploads = (file) =>{
//     return new Promise(resolve => {
//     cloudinary.uploader.upload(file, (result) =>{
//     resolve({url: result.url, id: result.public_id})
//     }, {resource_type: "auto"})
//     })
//     }

// app.use('/uploads', cloudiRouter);

// if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
//     console.log('undefined, export CLOUDINARY_URL or set dotenv file');
//   } else {
//     console.log('cloudinary config:');
//     console.log(cloudinary.config());
//     res.locals.cloudinary = cloudinary;
//     next();
//   }
  

//connection to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
    .then((x) => {
        console.log(`database name: ${x.connections[0].name}`);
    }).catch(err => {
        console.log('error', err);
    });

//uploading files
const myStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/userPhotos')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
    })
    const upload = multer({ storage: myStorage });

//setting the session cookie
app.use(session({
    secret: "basic-auth-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    })
    }));


//accessControl with session
let accessControl = (req, res, next)=> {
    if (req.session.user){
        // console.log(req.session)
        next();
    }else{
        res.redirect('/login')
    }
}

app.use(function(req,res,next) {
    if(req.session.user) res.locals.user = req.session.user;
    // console.log(res.locals.user)
    next();
    })

const login = require('./routes/login')
app.use('/', login);
const signup = require('./routes/signup')
app.use('/', signup);
const index = require('./routes/index')
app.use('/', accessControl, index);
const create = require('./routes/create')
app.use('/', accessControl, upload.single('image'), create);
const profilepage = require('./routes/profilepage')
app.use('/', accessControl, upload.single('profileImg'), profilepage);
const logout = require('./routes/login')
app.use('/', accessControl, logout);
const changepassword = require('./routes/changepassword')
app.use('/', accessControl, changepassword);
const updateInfo = require('./routes/updateInfo')
app.use('/', accessControl, upload.single('image'), updateInfo);
const deletepost = require('./routes/delete')
app.use('/', accessControl, deletepost);

app.listen(process.env.PORT, () => {console.log(`app listening on port ${process.env.PORT}`)})