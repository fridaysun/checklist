var mongoose = require('mongoose');

var testitemsSchema = mongoose.Schema({
    number: Number,
    items: String,
    rse: String,
    result: String,
    comments: String
});

module.exports = mongoose.model('Testitems', testitemsSchema);