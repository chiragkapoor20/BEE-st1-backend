const express = require('express');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const dbstring = process.env.DATABASE_URL;
mongoose.connect(dbstring);

const db = mongoose.connection;

db.on('error',(error)=>{
    console.log(error);
});
db.once('connected',()=>{
    console.log("Database Connected");
});
dotenv.config({path:'.env'});
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/genuine',routes);

app.listen(PORT,()=>{
    console.log(`Server hosted on http://localhost:${PORT}/genuine`);
})