import fs from 'fs';
import { waitForDebugger } from 'inspector';
import { join } from 'path';
import notification from "../models/notification.js";


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
export function getMyNotifications(req, res) {
    notification.
    find({receiver:req.body.id}).populate('sender','username avatar')
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