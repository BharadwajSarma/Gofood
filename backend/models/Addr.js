const mongoose = require('mongoose');

const AddrSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('Addre', AddrSchema);
