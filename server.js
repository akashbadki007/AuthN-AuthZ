const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/v1',userRoutes);

require('./config/database').dbConnect();

app.listen(PORT, () => {
    console.log(`Server Started Successfully At ${PORT}`);
})

app.get('/', (req,res) => {
    res.send(`<h1> This Is Home Page </h1>`)
})
