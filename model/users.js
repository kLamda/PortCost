const mongoose = require('mongoose');
var crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true},
    email: {type: String, required: true},
    // password: {type: String, required: true},
    phone:{type: Number, required: true},
    daysAllowed: {type: Number, default: 3},
    isVesAgent: {type: Boolean, default: false},
    isExpImp: {type: Boolean, default: false},
    isStevedore: {type: Boolean, default: false},
    hash : String,
    salt : String
},
{
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 
    1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, 
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = mongoose.model('user', userSchema, 'user');