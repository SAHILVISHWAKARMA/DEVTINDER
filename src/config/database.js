const mongoose = require('mongoose')

const connectDB = async () =>{
    const connectionString = 'mongodb+srv://sahilvishwakarma6260:zD2SjTaVnP0FSpsm@cluster0.ewzc8ce.mongodb.net/devTinder';
    await mongoose.connect(connectionString);
}

module.exports = connectDB