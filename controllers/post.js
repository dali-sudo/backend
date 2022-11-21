import Post from "../models/post.js";
import fs from 'fs'

export function getAll(req, res) {
    Post
    .find({}).sort({ date: -1 }).populate('owner','username avatar')

    .then(docs => {
        
      
        
            for(var j=0;j<docs.length;j++)
            {
                if(docs[j].owner){
                    if(docs[j].owner.avatar){
              if(docs[j].owner.avatar.length<100)
                docs[j].owner.avatar= fs.readFileSync(docs[j].owner.avatar, "base64");
                    }
                }
               }
          
       
       
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}

export function addOnce(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
        // Invoquer la méthode create directement sur le modèle
        let date_ob = new Date();
        Post
        .create({
            descreption: req.body.descreption,
            date: date_ob ,
            images: req.body.images,
            owner:req.body.owner,
            likescount:0,
            likes:[]
            
        })
        .then(newPost => {
            res.status(200).json(newPost);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
}
export function addLike(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
        // Invoquer la méthode create directement sur le modèle
        Post
        .findOneAndUpdate({ "_id":req.body.id }, { likescount: req.body.likescount,$push:{likes:req.body.like}})
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
        
}
export function RemoveLike(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
        // Invoquer la méthode create directement sur le modèle
        Post
        .findOneAndUpdate({ "_id":req.body.id }, { likescount: req.body.likescount,$pull:{likes:req.body.like}})
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
        
}

function encode_base64(filename) {
    return fs.readFileSync(filename, "base64");
  }
  
  // from base64 to actual image 
  function base64_decode(base64Image, file) {
    const buffer = Buffer.from(base64Image,"base64");
    fs.writeFileSync(file,buffer);
     console.log('******** File created from base64 encoded string ********');
  
  }
  
  export function getPostsByUser(req, res) {
    Post
    .find({owner:req.body.id}).sort({ date: -1 }).populate('owner','username avatar')


    .then(docs => {
        
      
        for(var j=0;j<docs.length;j++)
        {
            if(docs[j].owner){
                if(docs[j].owner.avatar){
          if(docs[j].owner.avatar.length<100)
            docs[j].owner.avatar= fs.readFileSync(docs[j].owner.avatar, "base64");
                }
            }
           }
    
       
       
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}