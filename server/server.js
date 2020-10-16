const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// app.use('/', express.static('public'));
app.use(cors());

const budget = './myBudget.json';
const fs= require("fs");




app.get('/budget', (req, res) => {
    //res.json(budget);
    fs.readFile(budget,"utf8",(err,data)=>{
        if(err){
            throw err;
        }
        res.send(JSON.parse(data));
    }
    );
}) 

app.listen(port, () => {
    console.log(` API served at http://localhost:${port}`);
});