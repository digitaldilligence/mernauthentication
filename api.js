const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user');
const mongoose = require('mongoose');
app.use(cors());
mongoose.connect('mongodb+srv://alex:root@cluster0-bnjad.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB Connected");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
    res.send("HI");
});

app.get('/users', (req, res)=>{
    if(req.query){
        User.find({username: req.query.username, password: req.query.password}, (err, user)=>{
            err || user===null?res.json('no user'):res.json(user);
        })
    }else{
    User.find({}, (err, users) =>{
        err?res.json(err):res.json(users);
    })
}
});
app.get('/users/:userID', (req, res)=>{
    User.findById(req.params.userID, (err, user)=>{
        err?res.json(err):res.json(user);
    })
})
app.listen(5000);