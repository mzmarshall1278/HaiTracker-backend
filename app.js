const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helm = require('helmet');
const comp = require('compression');
const morgan = require('morgan')

const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/location');
const teamRoutes = require('./routes/team');
const app = express();

const accessLogStrem = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags : 'a'});

app.use(bodyParser.json());
app.use(cors());
app.use(helm());
app.use(comp());
app.use(morgan('combined', {stream: accessLogStrem}));

app.use('/auth', authRoutes);
app.use('/locations', locationRoutes);
app.use('/team', teamRoutes);

app.use((error, req, res, next) => {
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message : message});
});


 mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-vwxyr.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser:true, useUnifiedTopology:true}).then(result => {

app.listen(process.env.PORT || 4000, ()=> console.log('App running...'));
}).catch(err =>{
    console.log('cant connect to mongoose')
});
