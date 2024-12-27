const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Parse cookies

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 4000

// Routes
const route = require("./Routes/userRoutes");
app.use('/api/v1/user', route);

// DB Connections
require("./Config/database").dbConnects();

app.listen(PORT, () => {
    console.log(`Server listen at PORT NO: ${PORT}`);
})

// app.get("/api/v1/test", (req, res) => {
//     res.status(200).json({ success: true, msg: "Server is live" });
//   });


app.get('/', (req,res) => {
    res.send(`<h1> THIS IS HOME PAGE... </h1>`)
})