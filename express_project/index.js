const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();
const port = 3001;

// Custome Middleware : A middleware is function which has access to req and res.
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
}

// init middleware.
app.use(logger);

// Use body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Set a folder as static folder.
app.use(express.static(path.join(__dirname,'public')));

// Member API member.
app.use('/api/members', require('./routes/api/members'));

app.listen(port,()=>{
    console.log("App is listening on port 3001")
})