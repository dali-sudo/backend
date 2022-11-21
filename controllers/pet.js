

import Pet from "../models/pet.js";
import fs from 'fs';


//add a pet 
export function addOnce(req, res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    let newPet = {};
        // Invoquer la méthode create directement sur le modèle
        if (req.body.avatar)
        { 
          //convert string into actual image and save it to imgs
         // const imagePath = `${req.protocol}://${req.get("host")}/uploads/${Math.random().toString(36).substring(2,7)}.png`
         var imagePath = `./uploads/${Math.random().toString(36).substring(2,7)}.png`;
          base64_decode(req.body.avatar,imagePath);
          
          
          
          newPet = {
            name: req.body.name,
            type: req.body.type ,
            race: req.body.race,
            owner:req.body.owner,
            avatar:imagePath,
            sexe:req.body.sexe ,
            age: req.body.age
         
        }

    }
    else {
        newPet = {
            name: req.body.name,
            type: req.body.type ,
            race: req.body.race,
            owner:req.body.owner,
            sexe:req.body.sexe ,
            age: req.body.age
         
        }


    }
        Pet
        .create( newPet)
        .then(newPet => {
            res.status(200).json(newPet);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
}


//getAllPets
export function getAllByUser(req, res) {
    Pet
    .find({owner : req.body.owner } ).sort({createdAt:-1})

    .then((docs)  => {
      
          
        
        res.status(200).json(encodeAllElements(docs));

      
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

  function encodeAllElements(documents) 
  {
    for (var i=0; i<documents.length;i++) 
    {

        if (documents[i].avatar)
        {
            documents[i].avatar= encode_base64( documents[i].avatar);
        }
    }
   
    return documents;
  }
  
  