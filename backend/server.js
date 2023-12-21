const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { monngdbConnection } = require("./config/mongoDbConnection");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

// create srver
const app = express();
const PORT = process.env.PORT || 3001

// DB connection
monngdbConnection();

app.use(cors("*"))
app.use(bodyParser.json())
app.use("/user", userRoutes)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})