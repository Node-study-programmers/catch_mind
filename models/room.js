const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    masterImage: {
        type: String,
        default: "Basic"
    },
    masterNickname: {
        type: String,
        default: "AA"
    },
    roomName: {
        type: String,
        default: "방 이름"
    },
    roomMaxCount: {
        type: Number,
        default: 6
    },
    roomUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    status: {
        type: String,
        enum: ['waiting', 'playing'],
        default: 'waiting'
    }
}, {
    collection: 'rooms',
    versionKey: false
});

roomSchema.path('roomUsers').validate(function (value) {
    return value.length <= 6;
});

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);