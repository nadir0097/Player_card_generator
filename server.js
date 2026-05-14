
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./players.json";

function loadDB(){
  if(!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(data){
  fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2));
}

// LOGIN (simple demo)
app.post("/login",(req,res)=>{
  const {user,pass} = req.body;
  if(user==="admin" && pass==="admin"){
    res.json({success:true,token:"admin-token"});
  } else {
    res.json({success:false});
  }
});

// CREATE PLAYER
app.post("/players",(req,res)=>{
  const db = loadDB();
  const player = {...req.body, id:Date.now()};
  db.push(player);
  saveDB(db);
  res.json(player);
});

// GET ALL
app.get("/players",(req,res)=>{
  res.json(loadDB());
});

// SEARCH
app.get("/search",(req,res)=>{
  const q = (req.query.q||"").toLowerCase();
  const db = loadDB();
  res.json(db.filter(p =>
    (p.firstName||"").toLowerCase().includes(q) ||
    (p.lastName||"").toLowerCase().includes(q) ||
    (p.cert||"").includes(q)
  ));
});

app.listen(PORT,()=>console.log("Server running on "+PORT));
