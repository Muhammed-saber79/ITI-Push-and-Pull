const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
require("dotenv").config();

require("./Models/Notifications");
const Notifications = mongoose.model("notifications");

const server = express();
const PORT = process.env.PORT || 0;
const DB_URL = process.env.DB_URL || "";

const cors = require('cors');
server.use(cors());

server.use(express.json());
server.use(function(req, res, next) {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// DB Connection...
mongoose.connect(DB_URL)
    .then(()=>{
        console.log("DB Connected...");
        server.listen(PORT , () => {
            console.log("Server is Listening...");
        })
    })
    .catch(error=>{
        console.log("Cannot Connect DB: "+error);
    });

// Notifications Operations...
server.post("/notifications", async(req, res)=>{
    const {body} = req;
    try{
        const notifications = await Notifications.create(body);
        res.status(200).json({message: "Done...", data: notifications})
    }catch(error){
        res.status(500).json({error: error})
    }
})

server.get("/notifications", (req, res)=>{
    Notifications.find()
    .then((data)=>{
        if(data == null){
            res.status(200).json({message:"No Notifications Exist..."})
        }else{
            res.status(200).json({message:"All Notifications...", data:data});
        }
    }).catch((error)=>{
        res.status(500).json({error: error})
    })
})

server.get("/notifications/:userId", (req, res)=>{
    let userId = req.params.userId;
    console.log(""+userId);
    Notifications.find({userId: userId})
    .then((data)=>{
        if(data == null){
            res.status(200).json({message:"No Notifications Exist..."})
        }else{
            res.status(200).json({message:"All Notifications...", data:data});
        }
    }).catch((error)=>{
        res.status(500).json({error: error})
    })
})

server.delete("/notifications/:_id", (req, res)=>{
    let _id = req.params._id;
    Notifications.findByIdAndDelete(_id)
    .then((deleted)=>{
        if(deleted){
            res.status(200).json({message:"Message deleted successfully.", data: deleted})
        }else{
            res.status(404).json({message:"No Such Message Found...!"});
        }
    }).catch((error)=>{
        res.status(500).json({error: error})
    })
})