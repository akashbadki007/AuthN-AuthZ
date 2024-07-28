const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database Created Successfully....");
    })
    .catch(() => {
        console.log("Fetching error in database....");
        // console.error(error);
        process.exit(1);
    })
}