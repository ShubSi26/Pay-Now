const express = require('express');
const cors = require('cors');
const path = require('path');


const route = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',route);

app.listen(3000,()=>{
    console.log("Server started at 3000");
})