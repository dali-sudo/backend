import Post from "../models/post.js";
import notification from "../models/notification.js";
import User from "../models/user.js";
import fs from 'fs'
import { addnotif} from "../controllers/notification.js";
export function getAll(req, res) {
    Post

    .find({}).sort({ date: -1 }).populate('owner','username avatar').populate('tags' , 'name')

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
          
               for(var j=0;j<docs.length;j++)
               {
                   for(var i=0;i<docs[j].images.length;i++)
                   {
                   if(docs[j].images){
                       if(docs[j].images[i]){
                 if(docs[j].images[i].length<100)
                 docs[j].images[i]= fs.readFileSync(docs[j].images[i], "base64");
                       }
                   }
                  }}
       
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}
export async function  pagination(req, res) {

  try{

  let promise1=User.findById(req.body.id)
  let doc1=await(promise1)
doc1.following.push(req.body.id)
   let promise2= Post
    .find({owner:doc1.following}).sort({ date: -1 }).skip(req.body.skip).limit(req.body.limit).populate('owner','username avatar').populate('tags' , 'name')


    
     let docs=await(promise2)
      
        
            for(var j=0;j<docs.length;j++)
            {
                if(docs[j].owner){

                    if(docs[j].owner.avatar){
              if(docs[j].owner.avatar.length<100)
                docs[j].owner.avatar= fs.readFileSync(docs[j].owner.avatar, "base64");
                    }

                }
               }
          
               for(var j=0;j<docs.length;j++)
               {
                   for(var i=0;i<docs[j].images.length;i++)
                   {
                   if(docs[j].images){
                       if(docs[j].images[i]){
                 if(docs[j].images[i].length<100)
                 docs[j].images[i]= fs.readFileSync(docs[j].images[i], "base64");
                       }
                   }
                  }}
       
        res.status(200).json(docs);
        
    
    }
    catch(err){
        res.status(500).json(err);
       
       }
}

export function addOnce(req, res) {
   var  imagetab=[];
    var imagePath="";
     
    var data = {
        message: "Post Created ", 
        
      };
 
  
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    for(var i=0;i<req.body.images.length;i++){
        console.log("image"+i)
        imagePath = `./uploads/${Math.random().toString(36).substring(2,7)}.png`;
    base64_decode(req.body.images[i],imagePath);
    console.log(imagePath)

    imagetab.push(imagePath)
    }
    console.log("tab"+imagetab)
        // Invoquer la méthode create directement sur le modèle
        let date_ob = new Date();
        Post
        .create({
            descreption: req.body.descreption,
            date: date_ob ,
            images:imagetab,
            owner:req.body.owner,
            likescount:0,
            likes:[], 
            tags : req.body.tags
            
        })
        .then(newPost => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
    
}
export async function addLike(req, res) {
    let date_ob = new Date();
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  try{
        // Invoquer la méthode create directement sur le modèle
        let promise1 = 
         Post
        .findOneAndUpdate({ "_id":req.body.id }, { $inc: { likescount:1},$push:{likes:req.body.like}})
        let doc = await (promise1)
        if(req.body.like==doc.owner){
        }
        else{
            console.log(req.body.like+" "+doc.owner)
            let promise3=User.findOne({ "_id":req.body.like })
            let doc3 = await (promise3)
        let promise2 =   notification
        .create({
             sender:req.body.like,
             receiver:doc.owner,
             type:"like",
             title:doc3.username+" "+"liked your Post",
             content:"",
             is_read:false,
             created_at:date_ob,
            
        })
        let doc2 = await (promise2)
        addnotif(doc.owner)
    }
        res.status(200).json(doc);
    } catch(err){
     res.status(500).json(err);
    
    }
}
export function RemoveLike(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
  
        // Invoquer la méthode create directement sur le modèle
        Post
        .findOneAndUpdate({ "_id":req.body.id }, {$inc: { likescount:-1},$pull:{likes:req.body.like}})
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
    .find({owner:req.body.id}).sort({ date: -1 }).populate('owner','username avatar').populate('tags' , 'name')


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
           
        for(var j=0;j<docs.length;j++)
        {
            for(var i=0;i<docs[j].images.length;i++)
            {
            if(docs[j].images){
                if(docs[j].images[i]){
          if(docs[j].images[i].length<100)
          docs[j].images[i]= fs.readFileSync(docs[j].images[i], "base64");
                }
            }
           }}
    
       
       
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}
export function getAllwithimage(req, res) {
    Post
    .aggregate([
        
           { $match:{images: { $ne: [] }}},
           {
        
            $addFields: {
                tmpOrder: { '$rand': {} },
            }},
           
        {
            $sort: {
                tmpOrder: 1,
            },
        },
        {
            $project:
             {
               
                image: { $arrayElemAt: [ "$images", 0 ] },
              
             }
          }
    ]) .then(docs => {
           

        for(var j=0;j<docs.length;j++)
        {

            if(docs[j].image){
              
          if(docs[j].image.length<100)
          docs[j].image= fs.readFileSync(docs[j].image, "base64");
                }
            }
           
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}
export function getPostByid(req, res) {
    Post.
    findOne({_id:req.body.id}).populate('owner','username avatar').populate('tags' , 'name')
    .then(docs => {
            docs.owner.avatar= fs.readFileSync(docs.owner.avatar, "base64");
           
                for(var i=0;i<docs.images.length;i++)
                {
             
                    if(docs.images[i]){
              if(docs.images[i].length<100)
              docs.images[i]= fs.readFileSync(docs.images[i], "base64");
                    }
                
               }
            
        res.status(200).json(docs);
        
    
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });

}
export function deletepost(req, res) {
    Post
    .deleteOne({ _id: req.body.id })
    .then(
       {
            message : res.status(200).json(" Deleted Successfully")
       } 
    )
    .catch(err => {
            
        res.status(500).json({ error: err });

    });


}