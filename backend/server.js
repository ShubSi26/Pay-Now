const express = require('express');
const cors = require('cors');


const route = require("./routes/routes");

const app = express();
app.use(cors());
app.use('/',route);

app.listen(3000,()=>{
    console.log("Server started at 3000");
})