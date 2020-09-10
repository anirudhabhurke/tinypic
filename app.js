const express = require('express');
const path = require('path');
const multer = require('multer');

const mainRoutes = require('./routes/main');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, './public')));
app.use('/images', express.static(path.join(__dirname, './images')));

const fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, './images');
      },
      filename: (req, file, cb) => {
            cb(null, file.originalname);
      },
});
const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
      } else {
            cb(null, false);
      }
};
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/', mainRoutes);

app.listen(8080, (req, res) => {
      console.log('Open http://localhost:8080 in browser');
});
