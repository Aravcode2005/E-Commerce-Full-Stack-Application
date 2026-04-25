const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const dotenv = require('dotenv');
const multer = require('multer');
const flash = require('flash');

dotenv.config();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}-${file.originalname}`);
  }
});
const errorController = require('./controllers/error');
const User = require('./models/user');
const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session ? req.session.isLoggedIn : false;
  res.locals.csrfToken = req.csrfToken();
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session ? req.session.isLoggedIn : false
  });
});
const MONGODB_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, {
    dbName: 'Ecommerce',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

