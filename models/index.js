const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('MongoDB connected');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectMongoDB;