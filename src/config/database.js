const mongoose = require("mongoose"); 

const connectToDataBase = async () => {
    await mongoose.connect(
      'mongodb+srv://nithyaganeshdev:Nithyaganesh%40123@mycluster.sr1w4.mongodb.net/blog'
    );
console.log("Connected to DB")
};

module.exports = connectToDataBase; 