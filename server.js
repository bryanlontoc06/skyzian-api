const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();




// import routes
const userRoutes =  require('./routes/user')
const patientRoutes =  require('./routes/patient')


// app middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


// app.use(cors()); // allow all requests from all domains
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `http://localhost:3000`}));
}

// import the middleware
app.use('/api', userRoutes);
app.use('/api', patientRoutes);



const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});