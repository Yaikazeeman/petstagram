const cloudinary = require('cloudinary').v2
// const imageController = require('./imageController');
// const upload = require('./cloudinaryUploads/multer');
// var cloudiRouter = require('../imageRoutes');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const uploadCloud = multer({ storage: storage });
const cloudinary_upload_preset = 'rdwi5akv';

// app.use('/uploads', express.static('uploads'))

// cloudinary setup
// cloudinary.uploader.upload_stream(
//     { agent: myAgent },
//     function(error, result) { console.log(result); }
//   );

cloudinary.config({ 
cloud_name: process.env.CLOUD_NAME, 
api_key: process.env.API_KEY, 
api_secret: process.env.API_SECRET 
});

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
  });

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

  module.exports = uploadCloud;