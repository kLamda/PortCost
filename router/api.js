const express = require('express');
const router = express.Router();
const User = require('../model/users');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const db = "mongodb+srv://admin:admin@cluster0.ziqyx.mongodb.net/PortData?retryWrites=true&w=majority";
mongoose.connect(db, err => {
    if (err) {
        console.log('Error in connect the database' + err);
    } else {
        console.log('Connected to Mongodb');
    }
});

router.get('/', (req, res) => {
    res.send("From API router")
});

router.get('/showall', (req, res) => {
    MongoClient.connect(db, function(err, db) {
        useNewUrlParser: true
        if (err) throw err;
        console.log("Database connected!");
        var dbo = db.db("PortData");
        dbo.collection("Foreign").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
        });
    });
})


router.post('/register', (req, res) => {
    User.find({"email": req.body.email})
        .then(
            result => {
                if (result.length !== 0) {
                    res.json({
                        message: 'Email already exists',
                        status: false
                    })
                } else {
                    let userData = req.body
                    let user = new User(userData)
                    user._id = new mongoose.Types.ObjectId()
                    user.save()
                        .then(
                            result => {
                                res.json({
                                   message: 'User register success',
                                   status: true
                                })
                            }
                        )
                        .catch(
                            error => {
                                console.log(error)
                                res.json({
                                   message: ' User Register fail',
                                   status: false,
                                })
                            }
                        )
                }
            }
        )
        .catch(
            error => {
                res.json({
                    message: ' User Register fail',
                    status: false,

                })
            }
        )
});

router.post('/login', (req, res) => {
    console.log(req.body)
    User.find({"email": req.body.email})
        .then(
            result => {
                if (result.length !== 0) {
                    console.log(result[0].password)
                    console.log(req.body.password)
                    if(req.body.password === result[0].password) {
                        res.json({
                            message: 'User login success',
                            status: true,
                        })
                    } else {
                        res.json({
                           message: 'User Login unsuccessful',
                           status: false,
                        })
                    }
                } else{
                    res.json({
                        message: 'User login Unsuccessful',
                        status: false
                    })
                }
            }
        )
        .catch(
            error => {
                res.json({
                    message: ' User login fail',
                    status: false,

                })
            }
        )
});

module.exports = router;