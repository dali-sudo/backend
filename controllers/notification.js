import fs from 'fs';
import { waitForDebugger } from 'inspector';
import { join } from 'path';
import notification from "../models/notification.js";

var  notifications=[];
var i=0;
export function addnotif(userid){
    var notif = new Object();
    notif.id=i
    notif.userid =userid;
    i++
   notifications.push(notif);
   console.log("notif added"+notifications[0].userid)
 
}

export function deletenotif(userid){
    var n
    for( var i=0, len= notifications.length; i<len; ++i ){
       n =  notifications[i];
       if(n.userid==userid){
       notifications.splice(i,1);
        console.log("deleted")
       }
    }
}
export function addOnce(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    let date_ob = new Date();
        // Invoquer la méthode create directement sur le modèle
        notification
        .create({
             sender:req.body.sender,
             receiver:req.body.receiver,
             type:req.body.type,
             title:req.body.title,
             content:req.body.content,
             is_read:false,
             created_at:date_ob,
            
        })
        .then(newNotification => {
            res.status(200).json(newNotification);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
}
export function getMyNotifications2(req, res) {
    notification.
    find({receiver:req.body.id}).populate('sender','username avatar').limit(5)
    .then(docs => {
        for(var j=0;j<docs.length;j++)
        {
                if(docs[j].sender.avatar){
          if(docs[j].sender.avatar.length<100)
            docs[j].sender.avatar= fs.readFileSync(docs[j].sender.avatar,"base64");
                }
            
           }
           res.status(200).json(docs);
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}
export async function getMyNotifications(req, res) {

   try{
    let c=0;
  var t=false
while(t==false){ 
    
    for( var i=0, len=notifications.length; i<len; ++i ){
       
  
        if(notifications[i].userid ==req.body.id){
          console.log("found")
           t=true;
         break;
        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
 
}
deletenotif(req.body.id)
   let promise2 = notification.
    find({receiver:req.body.id,is_read:false}).populate('sender','username avatar')
   let  docs = await(promise2)
  
  
 
        for(var j=0;j<docs.length;j++)
        {
                if(docs[j].sender.avatar){
          if(docs[j].sender.avatar.length<100)
            docs[j].sender.avatar= fs.readFileSync(docs[j].sender.avatar,"base64");
                }
            
           }
           res.status(200).json(docs);
           let promise3 = notification.updateMany({receiver:req.body.id}, {$set: { is_read:true }})
           let  doc2 = await(promise3)
        } catch(err){
            res.status(500).json(err);
           }

}