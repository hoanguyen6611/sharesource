const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        // await mongoose.connect('mongodb+srv://hoanguyen2661:26062001@cluster0.csnk9.mongodb.net/projectcntt?retryWrites=true&w=majority');
        console.log('connect success');
    } catch (error) {
        console.log('fail');
    }
}
module.exports = {connect};