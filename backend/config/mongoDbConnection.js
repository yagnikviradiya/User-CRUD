const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const dbUrl = process.env.DB_URL

const monngdbConnection = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useNewUrlParser: true,
        })
        console.log("Data base connected");
    } catch (error) {
        console.log("Error wile Data base connection", error);

    }

}

module.exports = { monngdbConnection }

