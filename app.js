const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// const https = require('https');
// const http = require('http');
// const fs = require('fs');

require('dotenv').config();
const PORT = 5500;
const MONGODB_URI = 'mongodb+srv://nitishramaraj:Nitish123@counsailia.wmmielx.mongodb.net/?retryWrites=true&w=majority'


const CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRETKEY,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}
const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin/adminRoute');
const studentRoutes = require('./routes/student/studentRoute');
const parentRoutes = require('./routes/parent/parentRoute');
const { cookie } = require('express/lib/response');

app.use(helmet());

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false ,
      store: store
    })
  );



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done) => {
  
    done(null, user);
});

passport.deserializeUser((obj,done) => {
    done(null, obj);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin-panel', adminRoutes)
app.use('/student', studentRoutes)
app.use('/parent', parentRoutes)

app.get('/', (req, res) => {
    res.render('public/homePage', {
        pageTitle: 'Counsailia: Sail through your career',
      });
})



// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }).listen(PORT, () => {
//     console.log(`Listening on PORT : ${PORT}`);
// })

// app.listen(PORT, () => {
//     console.log(`Running on PORT : ${PORT}`);
// })

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    app.listen(PORT);
    console.log(`Listening on PORT : ${PORT}`);
  })
  .catch(err => {
    console.log(err);
  });