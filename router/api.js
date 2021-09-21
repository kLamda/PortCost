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

function calcTime(timestamp1, timestamp2) {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference/1000/60/60/24);

    return daysDifference;
}

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

router.post('/getTime', (req, res) =>{
    User.find({"_id": req.body.user_id}).then(
        result => {
            if (result.length!==0){
                let days = calcTime(new Date().getTime(), result[0].createdAt.getTime())
                if(days<=result[0].daysAllowed){
                    res.json({
                        user_id: result[0]._id,
                        userName: result[0].userName,
                        userEmail: result[0].email,
                        message: 'User login success',
                        status: true,
                        daysLeft: result[0].daysAllowed - days
                    })
                }
            } else {
                res.json({status: false, message: "ID not found"})
            }
        }
    ). catch(
        error => {
            res.send("Couldn't connect");
            console.log(error);
        }
    )
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
                                   user_id: result[0]._id,
                                    userName: result[0].userName,
                                    userEmail: result[0].email,
                                    message: 'User register success',
                                    status: true,
                                    daysLeft: result[0].daysAllowed - days
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
    User.find({"email": req.body.email})
        .then(
            result => {
                if (result.length !== 0) {
                    let days = calcTime(new Date().getTime(), result[0].createdAt.getTime())
                    if(req.body.password === result[0].password && days <= result[0].daysAllowed) {
                        res.json({
                            user_id: result[0]._id,
                            userName: result[0].userName,
                            userEmail: result[0].email,
                            message: 'User login success',
                            status: true,
                            daysLeft: result[0].daysAllowed - days
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