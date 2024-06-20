const mongoose = require('mongoose');

const roomUserSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      default: "Basic"
    },
    score: {
      type: Number,
      default: 0
    }
  }, {
    _id: false
  });

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
    roomUsers: [roomUserSchema],
    roomStatus: {
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