const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    daysAllowed: {type: Number, default: 3}
},
{
    timestamps: true
});

module.exports = mongoose.model('user', userSchema, 'user');