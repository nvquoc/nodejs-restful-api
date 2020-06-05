const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const authMiddleware = require('./middlewares/auth');
const userAPIRoute = require('./routes/user.api');
const authAPIRoute = require('./routes/auth.api');

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB!');
});

db.on('error', (err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authAPIRoute);
app.use('/api/users',authMiddleware.requireAuth, userAPIRoute);


app.listen(port, () => console.log('Server started on port:', port));