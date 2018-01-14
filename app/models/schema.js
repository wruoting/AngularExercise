var mongoose = require('mongoose');

module.exports = mongoose.model('Schema', {
    text: {
        type: String,
        default: ''
    }
});
