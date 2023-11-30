const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);


//DB config
const db = require('./config/keys.js').MongoURI

//Connect to mongo
mongoose.connect(db)
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser

app.use(express.urlencoded({ extended: false}))

//Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



//Connect Flash
app.use(flash());

//Global var
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});



//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server stared on port ${PORT}`));