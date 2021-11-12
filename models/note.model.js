const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    apartment: {type: String, required: true},
    name: { type: String, required: true},
    notetext: { type: String, required: true},
    date: {type: Date, required: true},
 }, {
        timestamps: true,
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;