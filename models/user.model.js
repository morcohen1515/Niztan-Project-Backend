const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    usertype: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: { type: String, required: true},
    bday: { type: String, required: true},
    city: { type: String, required: true},
    phonenumber: { type: String, required: true},
    emergencyphonenumber: { type: String, required: true},
    email: { type: String, required: true},
 }, {
        timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;