
import fs from 'fs';
import { waitForDebugger } from 'inspector';
import { join } from 'path';
import chatroom from "../models/chatroom.js";


export function addOnce(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
        // Invoquer la méthode create directement sur le modèle
        chatroom
        .create({
             Users:[req.body.id1, req.body.id2],
             chat:[],
            
        })
        .then(newChatroom => {
            res.status(200).json(newChatroom);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
}
export function sendMessage(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    if(req.body.type=="string")
  {
    chatroom
        .findOneAndUpdate({ "_id":req.body.id }, { $push:{chat:{message:req.body.message,type:req.body.type,senderid:req.body.senderid}}},{new: true}).populate('Users','username')
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }
    else 
    { 
        
   var imagePath = `./uploads/chat/${Math.random().toString(36).substring(2,7)}.png`;
    base64_decode(req.body.message,imagePath);

        chatroom
        .findOneAndUpdate({ "_id":req.body.id }, { $push:{chat:{message:imagePath,type:req.body.type,senderid:req.body.senderid}}},{new: true}).populate('Users','username')
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });


    
    } 
}

export function getChatRoom(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
    chatroom
        .findOne({ "_id":req.body.id },{'chat':true}).populate('Users','username')
        .then(doc => {
console.log(doc.chat[1]);
            for(var j=0;j<doc.chat.length;j++)
            {

                if(doc.chat[j].type=="image"){
                   
              if(doc.chat[j].message.length<100)
                doc.chat[j].message= fs.readFileSync(doc.chat[j].message, "base64");
                    
                }
               }
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
}
export function getMyChatRooms(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
    chatroom
        .find({ Users:req.body.id},{'Users':true }).populate('Users','username avatar')
        .then(docs => {
          
        
            for(var j=0;j<docs.length;j++)
            {
                for(var i=0;i<docs.length;i++)
                {
                    if(docs[j].Users[i]){
            if(docs[j].Users[i].id==req.body.id)
                    docs[j].Users.splice(i,1)
                    }
                }
               }
                
            for(var j=0;j<docs.length;j++)
            {
                for(var i=0;i<docs[j].Users.length;i++)
            {
                if(docs[j].Users[i]){
                    if(docs[j].Users[i].avatar){
                  
              if(docs[j].Users[i].avatar.length<100){
                docs[j].Users[i].avatar= fs.readFileSync(docs[j].Users[i].avatar, "base64");
              }
                
               }
            }}}
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}
    


        
export async function get(req, res) {
   
    try {
      
        var user=[req.body.id1,req.body.id2]
        let promise1 =  chatroom.findOne({ Users:{ "$all": user}})   
    
        let doc = await (promise1)
       console.log(doc)
        var docs = doc
        if(doc===null){
        let promise2 =chatroom.create({
             Users:[req.body.id1, req.body.id2],
             chat:[],
            
        })

        let doc2 = await Promise.all([promise2])
        let promise3 =  chatroom.findOne({ Users:{ "$all": user}})   
    
        let doc3 = await (promise3)
         docs = doc3
        }
       
        
        res.status(200).json({id:docs.id});
    } catch(err){
     res.status(500).json(err);
    }
      
          // Invoquer la méthode create directement sur le modèle
        

}

function base64_decode(base64Image, file) {
    const buffer = Buffer.from(base64Image,"base64");
    fs.writeFileSync(file,buffer);
     console.log('******** File created from base64 encoded string ********');
  
  }
  