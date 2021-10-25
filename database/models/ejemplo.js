const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    ejemplo: {type: String},
    boolean: {type: Boolean, default: false},
});

module.exports = mongoose.model('ejemplo',schema);