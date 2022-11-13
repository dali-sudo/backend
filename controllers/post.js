import Post from "../models/post.js";


export function getAll(req, res) {
    Post
    .find({}).populate('owner','username')

    .then(docs => {
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