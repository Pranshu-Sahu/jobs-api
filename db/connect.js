const mongoose = require('mongoose');

const connectDB = async (url) => {
const conn= await mongoose.connect(url);
console.log('mongodb connected')
return conn
console.error('error connecting db');
process.exit(1)

};

module.exports = connectDB;