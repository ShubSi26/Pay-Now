const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression')

const route = require("./routes/routes");

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',route);

app.listen(3000,()=>{
    console.log("Server started at 3000");
})