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

router.get('/getCol', (req, res) => {
    MongoClient.connect(db, {useNewUrlParser: true}, function(err, db) { 
        if (err) throw err;
        var dbo = db.db("PortData");
        dbo.listCollections().toArray(function(err, collInfos) {
            if (err) throw err;
            let collections = collInfos.map((value) => value.name).filter((value)=>value!='user');
            res.json({collection: collections, status: true});
            db.close(); 
        });        
    });
})

router.get('/getDoc/:id', (req, res) => {
    var collection = req.params.id;
    MongoClient.connect(db, {useNewUrlParser: true}, function(err, db) { 
        if (err) throw err;
        var dbo = db.db("PortData");
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close(); 
        });        
    });
})

router.post('/getTime', (req, res) =>{
    User.findOne({"_id": req.body.user_id}).then(
        result => {
            if (result!== null){
                let days = calcTime(new Date().getTime(), result.createdAt.getTime())
                if(days<=result.daysAllowed){
                    res.json({
                        user_id: result._id,
                        userName: result.userName,
                        userEmail: result.email,
                        message: 'User login success',
                        status: true,
                        daysLeft: result.daysAllowed - days,
                        phone: result.phone,
                        isVesAgent: result.isVesAgent,
                        isExpImp: result.isExpImp,
                        isStevedore: result.isStevedore,
                    })
                } else {
                    res.json({
                        status: "over",
                        message: 'Access Days over',
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
    if(`${req.body.phone}`.length < 10){
        res.json({
            status: false,
            message: 'Enter Valid Phone Number'
        })
    } else if(`${req.body.password}`.length < 6){
        res.json({
            status: false,
            message: 'Password must be at least 6 digits'
        })
    }
    else {
    User.find({"email": req.body.email})
        .then(
            result => {
                if (result.length !== 0) {
                    res.json({
                        message: 'Email already exists',
                        status: false
                    })
                } else {
                    let user = new User()
                    user.userName = req.body.userName;
                    user.email = req.body.email;
                    user.setPassword(req.body.password);
                    user._id = new mongoose.Types.ObjectId()
                    user.phone = req.body.phone;
                    user.save()
                        .then(
                            result => {
                                res.json({
                                    user_id: result._id,
                                    userName: result.userName,
                                    userEmail: result.email,
                                    message: 'User register success',
                                    status: true,
                                    daysLeft: result.daysAllowed - calcTime(new Date().getTime(), result.createdAt.getTime()),
                                    phone: result.phone,
                                    isVesAgent: result.isVesAgent,
                                    isExpImp: result.isExpImp,
                                    isStevedore: result.isStevedore,
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
    }
});

router.post('/login', (req, res) => {
    User.findOne({"email": req.body.email})
        .then(
            result => {
                if (result !== null) {
                    let days = calcTime(new Date().getTime(), result.createdAt.getTime())
                    if(result.validPassword(req.body.password) && days <= result.daysAllowed) {
                        res.json({
                            user_id: result._id,
                            userName: result.userName,
                            userEmail: result.email,
                            message: 'User login success',
                            status: true,
                            daysLeft: result.daysAllowed - days,
                            phone: result.phone,
                            isVesAgent: result.isVesAgent,
                            isExpImp: result.isExpImp,
                            isStevedore: result.isStevedore,
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
                console.log(error);
                res.json({
                    message: ' User login fail',
                    status: false,

                })
            }
        )
});

module.exports = router;