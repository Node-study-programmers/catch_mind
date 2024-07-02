const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.models.Word || mongoose.model('Word', WordSchema);