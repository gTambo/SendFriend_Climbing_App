const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gymRouter = require('./routes/gym.router');
const styleRouter = require('./routes/climb_style.router');
const climbsRouter = require('./routes/climbs.router');
const detailsRouter = require('./routes/details.router');

// const UploaderS3router = require('react-dropzone-s3-uploader/s3router');
const fileUpload = require('express-fileupload');


// Body parser middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/gym', gymRouter);
app.use('/api/style', styleRouter);
app.use('/api/climbs', climbsRouter);
app.use('/api/details', detailsRouter);

// app.use('/s3', UploaderS3router({
//   bucket: 'climbtags1',                           // required change to correct bucket name
//   region: 'us-east-2',                            // optional
//   headers: {'Access-Control-Allow-Origin': '*'},  // optional
//   ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
// }));
app.use(fileUpload());

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
