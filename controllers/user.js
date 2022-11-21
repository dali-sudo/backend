import User from "../models/user.js";
import emailValidator from 'deep-email-validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import fs from 'fs'


export async function signin(req, res) {
  try {
    const {valid, reason , validators} = await isEmailValid(req.body.email) ;
    if (!(req.body.email && req.body.password)) 
    {
      res.status(400).send("All input is required!! ")
    }
    
     
  
      const user = await  User.findOne({ email: req.body.email})
  
      if (user ) {
        if (await bcrypt.compare(req.body.password, user.password))
        {  
          if (user.avatar) 
          {
            const imagePath = user.avatar
            user.avatar= encode_base64(imagePath)

          }
          user.token= createToken(user._id) ; 
        
          var data = {
            message: "User logged in ", 
             data:user
          };
          res.status(200).json(data);
    
       /* User.findOne({ email: req.body.email})
      .then((doc) => {
        
        //res.status(200).json(doc);
        var data = {
          message: "User added", 
           data:doc
        }
        res.status(200).json(data)
        
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    */


        } else return res.status(401).send("wrong password");
        // Create token
      
  
    } else return res.status(401).send("cant find user !");
    
  } catch (err) 
  {
    console.log(err);
  }
  
}


export async function signup(req, res) {
  const {valid, reason , validators} = await isEmailValid(req.body.email) ;
  if (!(req.body.email && req.body.password && req.body.username ))
  {
    return res.status(409).send("All input is required"); 
  }
  
  
    // check if user already exist
    // Validate if user exist in our database
    
    if (await User.findOne({email : req.body.email  })) {
      return res.status(409).send("Email Already in use. Please Login");
    }
    const password = req.body.password
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const token = jwt.sign(
      { user_id: req.body.id, email: req.body.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // Creating user with token and encrypted password on DB and response it 
    User.create({
      username: req.body.username,
      password: encryptedPassword,
      email: req.body.email
      //avatar: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,

    })
      .then((newUser) => {
        res.status(200).json({
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
          token: createToken(newUser._id)
         // avatar: newUser.avatar,
        });

      
      })
      .catch((err) => {
        res.status(500).json({ error: err });
        
        
      });
  

}

export async function putOnce(req, res) {
  let newUser = {};
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.body.profilePic)
  { 
    //convert string into actual image and save it to imgs
   // const imagePath = `${req.protocol}://${req.get("host")}/uploads/${Math.random().toString(36).substring(2,7)}.png`
   var imagePath = `./uploads/${Math.random().toString(36).substring(2,7)}.png`;
    base64_decode(req.body.profilePic,imagePath);
    
    
    
    newUser = {
     
    username: req.body.username,
    password: encryptedPassword,
    email: req.body.email,
    avatar: imagePath,
  }

  //console.log(newUser);

  }
  else {

    newUser = {
     
      username: req.body.username,
      password: encryptedPassword,
      email: req.body.email,
      
    
  }
  
}
  
    
  
  User.findByIdAndUpdate(req.user.id, newUser)
    .then((doc1) => {
      console.log(doc1+"Doc1 **************************"); 
      User.findById(req.user.id)
        .then((doc2) => {
           imagePath = doc2.avatar
          doc2.avatar= encode_base64(imagePath)
          console.log(doc2+"doc2 ***************");
          res.status(200).json({
            message: "user updated !! ", 
            data : doc2
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
async function isEmailValid(email) {
  return emailValidator.validate(email)
}

const maxAge = 3*24*60*60
const createToken = (id) => 
{
return jwt.sign(
  { id },
  process.env.TOKEN_KEY,
  {
    expiresIn: maxAge,
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


