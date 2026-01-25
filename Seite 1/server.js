// server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const JWT_SECRET = "supersecretkey"; // in Produktion in .env speichern

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // serve HTML files

// MongoDB verbinden
mongoose.connect("mongodb://127.0.0.1:27017/opor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected"))
.catch(err=>console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  email: {type:String, unique:true},
  passwordHash: {type:String, required:true},
  calculatorData: {type:Object, default:{}}
});
const User = mongoose.model("User", userSchema);

// Auth Middleware
const authenticate = async (req,res,next)=>{
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.status(401).json({error:"Token missing"});
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if(!req.user) throw new Error();
    next();
  }catch(e){
    res.status(401).json({error:"Invalid token"});
  }
};

// Routes
app.post("/api/register", async (req,res)=>{
  const {username,email,password} = req.body;
  if(!username || !password) return res.status(400).json({error:"Felder fehlen"});
  if(await User.findOne({$or:[{username},{email}]})) return res.status(400).json({error:"Username oder Email existiert bereits"});
  const passwordHash = await bcrypt.hash(password,10);
  const newUser = new User({username,email,passwordHash});
  await newUser.save();
  const token = jwt.sign({id:newUser._id}, JWT_SECRET, {expiresIn:"7d"});
  res.json({token, username:newUser.username});
});

app.post("/api/login", async (req,res)=>{
  const {id,password} = req.body;
  if(!id || !password) return res.status(400).json({error:"Felder fehlen"});
  const user = await User.findOne({$or:[{username:id},{email:id}]});
  if(!user) return res.status(400).json({error:"User nicht gefunden"});
  const match = await bcrypt.compare(password,user.passwordHash);
  if(!match) return res.status(400).json({error:"Falsches Passwort"});
  const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:"7d"});
  res.json({token, username:user.username});
});

app.get("/api/profile", authenticate, (req,res)=>{
  const {username,email,calculatorData} = req.user;
  res.json({username,email,calculatorData});
});

app.post("/api/rechner", authenticate, async (req,res)=>{
  req.user.calculatorData = req.body;
  await req.user.save();
  res.json({success:true});
});

// Server starten
app.listen(PORT, ()=>console.log(`Server läuft auf http://localhost:${PORT}`));
