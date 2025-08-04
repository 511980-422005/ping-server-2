const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors({origin: "*", credentials: true}));

const BASE_URLS = {};
const TOKEN = "Fks7d29Ds91Aqp3RzXvBcnU83vHslTyq";

const auth = (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token||token!==TOKEN)return res.status(401).json({message:"Unauthorized"});
  next();
};

router.post("/saveBaseUrl", auth, (req,res)=>{
  const body = req.body;
  if(!body || typeof body !== "object") return res.status(400).json({message:"Invalid body"});
  Object.entries(body).forEach(([key,value])=>{
    BASE_URLS[key]=value;
  });
  res.send("URL(s) saved successfully");
});

router.get("/getBaseUrl/:key", (req,res)=>{
  const key = req.params.key;
  if(!BASE_URLS[key]) return res.status(404).json({message:"Key not found"});
  res.send(BASE_URLS[key]);
});

router.get("/BaseUrls", (req,res)=>{
  const list = Object.entries(BASE_URLS).map(([key,value])=>`<li><strong>${key}</strong>: ${value}</li>`).join("");
  res.send(`<html><body><ul>${list}</ul></body></html>`);
});

module.exports = router;
