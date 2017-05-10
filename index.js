const express = require('express');
const mongoose = require('mongoose');

const app = express();

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

mongoose.connect('mongodb://mongo:27017');

let User = mongoose.model('User', {
    email:  String,
    firstName: String,
    lastName: String
});

app.get('/users', async (req, res)=>{
    let users = await User.find({});
    res.json(users);
});

app.get('/create-user', (req, res)=>{
    const data = new User({
        email:  `${Date.now()}@mail.com`,
        firstName: 'Egor',
        lastName: 'Miasnikov'
    });
    data.save((err) => {
        if (err) {
            console.log("User save error", err);
        }
    });
    res.json(data);
});

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});
