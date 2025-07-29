 
const express = require("express");
const router = express.Router();
const cors = require('cors');

app.use(cors({
  origin: 'https://lanflix.vercel.app',
  credentials: true
}));

let BASE_URL = "";
const TOKEN = "Fks7d29Ds91Aqp3RzXvBcnU83vHslTyq";

const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token||token!==TOKEN)return res.status(401).json({message:"Unauthorized"});
    next();
};

router.post("/saveBaseUrl", auth, (req,res)=>{
    if(!req.body.url)return res.status(400).json({message:"URL is required"});
    BASE_URL=req.body.url;
    res.send("URL saved successfully");
});

router.get("/getBaseUrl", auth, (req,res)=>{
    res.send(BASE_URL);
});

module.exports = router;
