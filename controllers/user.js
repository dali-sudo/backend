import User from "../models/user.js";
import Post from "../models/post.js";
import notification from "../models/notification.js";
import emailValidator from 'deep-email-validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import fs from 'fs'
import { addnotif} from "../controllers/notification.js";

import nodemailer from 'nodemailer';
export async function signin(req, res) {
  try {
    const {valid, reason , validators} = await isEmailValid(req.body.email) ;
    if (!(req.body.email && req.body.password)) 
    {
      res.status(400).send("All input is required!! ")
    }
    
     
  
      const user = await  User.findOne({ email: req.body.email})
      
  
      if (user ) {
        if(!user.password)
        {
          res.status(401).send("cant find user !");
        }
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
export async function googlesignin(req,res){

  try {

      const user = await  User.findOne({ email: req.body.email})
  
      if (user ) {
      
        
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
  
    } else {

  
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
        email: req.body.email,
        //avatar: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
        followerscount:0,
        followingcount:0,
        followers:[],
        following:[],
        avatar:"./public/images/profilePicPlaceHolder.png"
  
      })
        .then((newUser) => {
          newUser.token= createToken(newUser._id) ; 
          var data = {
            message: "User logged in ", 
             data:newUser
          };
         
          res.status(200).json(data);
        
        })
        .catch((err) => {
          res.status(500).json({ error: err });
          
          
        });
      }
  } catch (err) 
  {
    console.log(err);
  }


}

export async function signup(req, res) {
  console.log("aaaa"+req.body[0]);
  const {valid, reason , validators} = await isEmailValid(req.body.email) ;
  if (!(req.body.email && req.body.password && req.body.username ))
  {
    var data = {
      message: "missing fields ", 
     
    };
    return res.status(409).json(data);
   
  }
  
  
    // check if user already exist
    // Validate if user exist in our database
    
    if (await User.findOne({email : req.body.email  })) {
      var data = {
        message: "Email Already in use. Please Login ", 
        data:null
       
      };
     

      return res.status(409).send(data);
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
      email: req.body.email,
      //avatar: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      followerscount:0,
      followingcount:0,
      followers:[],
      following:[],
      avatar: "./public/images/profilePicPlaceHolder.png"

    })
      .then((newUser) => {
        var data = {
          message: "Account Created ", 
           data:newUser,
        };
        res.status(200).json(data);
       
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


export function Find(req, res) {
  User
  .find({username: {$regex : "^" + req.body.username}}, { 'username':true,'avatar':true})

  .then(docs => {   
    for(var j=0;j<docs.length;j++)
    {
        if(docs[j].avatar){
         
      if(docs[j].avatar.length<100)
        docs[j].avatar= fs.readFileSync(docs[j].avatar, "base64");
            
        }
       }

      res.status(200).json(docs);
  })
  .catch(err => {
      res.status(500).json({ error: err });
  });

}
export async function Follow(req, res) {
  // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
try {
  let date_ob = new Date();
  
    let promise1 = User.findOneAndUpdate(
      { "_id":req.body.myid }, { $inc:  {followingcount:1},$push:{following:req.body.followed}}
    );

    let promise2 = User.findOneAndUpdate(
      { "_id":req.body.followed }, { $inc:{followerscount: 1},$push:{followers:req.body.myid}}
    );
    
   
    let doc = await Promise.all([promise1, promise2]);
    let promise3 =   notification
    .create({
         sender:req.body.myid,
         receiver:req.body.followed,
         type:"follow",
         title:doc[0].username+ " "+"followed you",
         content:"",
         is_read:false,
         created_at:date_ob,
        
    })
    let doc3 = await (promise3)
    addnotif(req.body.followed)
    const docs = [
      { myid:doc[0].id,followed:doc[1].id },
    ];

      // Invoquer la méthode create directement sur le modèle
      res.status(200).json(docs);
     } catch(err){
      res.status(500).json(err);
     }
      

    }
    export async function UnFollow(req, res) {
      // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    try {
      
        let promise1 = User.findOneAndUpdate(
          { "_id":req.body.myid }, { $inc:  {followingcount:-1},$pull:{following:req.body.followed}}
        );
    
        let promise2 = User.findOneAndUpdate(
          { "_id":req.body.followed }, {$inc:{followerscount:-1},$pull:{followers:req.body.myid}}
        );
    
        
        let doc = await Promise.all([promise1, promise2])
        const docs = [
          { myid:doc[0].id,followed:doc[1].id },
        ];
          // Invoquer la méthode create directement sur le modèle
          res.status(200).json(docs);
         } catch(err){
          res.status(500).json(err);
         }
          
    
        }

      export function getUser(req, res) {
        User
        .findOne({"_id":req.body.id }, { 'username':true,'followerscount':true,'followingcount':true,'avatar':true,'followers':true})
      
        .then(docs => {   
if(docs.avatar!=null){
          docs.avatar= fs.readFileSync(docs.avatar, "base64");
}
            res.status(200).json(docs);

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
      
      
}

export async function sendCodetoMail (req, res) {
var user =await User.findOne({email : req.body.email  })
  if (!user) {
    var data = {
      message: "Email not found ", 
      
     
    };
   

    return res.status(409).send(data);
  }


  
  let code = "";
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++) {
    code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  user.RecoverCode=code;
  user.save();
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'petbookmapp@gmail.com',
          pass: 'bnhwzgiywndupymo'
      }
  });
  
  // create mail options
  const mailOptions = {
      from: 'petbookmapp@gmail.com',
      to: 'reiotyr25@gmail.com',
      subject: 'Reset Password',
      html: " <html> <head> <title>Password Reset Request | Petbook</title> <meta charset="+"UTF-8"+"> <meta name="+"viewport"+" content="+"width=device-width, initial-scale=1.0"+"> <style> .header { background-color: yellow; padding: 20px; text-align: center; } .body { background-color: white; padding: 20px; text-align: left; } .footer { background-color: yellow; padding: 20px; text-align: center; } </style> </head> <body> <header class="+"header"+"> </header> <section class="+"body"+"> <p>Dear "+user.username+",</p> <p>We have received a request to reset the password for your account. To proceed with the password reset, please use the following code:</p> <h2 style="+"background-color: yellow; display: inline-block; padding: 5px;"+">"+code+"</h2> <p>This code will expire in 24 hours, so please make sure to use it before then.</p> <p>To reset your password, please follow these steps:</p> <ol> <li>Go to the login page on our website.</li> <li>Enter your email address and the code provided in this email.</li> <li>Follow the instructions to reset your password.</li> </ol> <p>If you did not request a password reset, please disregard this email.</p> </section> <footer class="+"footer"+"> <p>Thank you,</p> <p>PetBook</p> </footer> </body> </html> "
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json(error);
      } else {
          console.log('Email sent: ' + info.response);
        
            var data = {
              message: "Email qent ", 
              
             
            };
          res.status(200).json(data);
      }
  });


}
export async function CodeVerification(req, res) {
  try{
    var data = {
      message: "Correct ", 
       
    };
  var user= await User.findOne({email : req.body.email  })

   if(user.RecoverCode)
{
  if(user.RecoverCode==req.body.code)
 
  res.status(200).json(data);
  else
  res.status(400).json("incorrect");
}
   else res.status(404)
  }
  catch (err) 
  {
    res.status(500)
  }

}
export async function restPassword(req, res) {
  try{
    var data = {
      message: "PasswordReset", 
       
    };
  var user= await User.findOne({email : req.body.email  })
 
  if (!user) {


    return res.status(409).send("user not found");
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  user.password=encryptedPassword 
  user.save()
  res.status(200).json(data)
  }
  catch(err){
    res.status(500);
  }

}

export async function getUserProfil(req, res) {
  try{
    const userPromise = User.findOne(
      { "_id": req.body.id },
      {
        "username": true,
        "followerscount": true,
        "followingcount": true,
        "avatar": true,
        "followers": true
      }
    );
    const postsPromise = Post.find(
      { "owner": req.body.id },
      { "images": true }
    );
    
    const [user, posts] = await Promise.all([userPromise, postsPromise]);
    
    if (user.avatar != null) {
      user.avatar = fs.readFileSync(user.avatar, "base64");
    }
    for(var j=0;j<posts.length;j++)
    {
        for(var i=0;i<posts[j].images.length;i++)
        {
        if(posts[j].images){
            if(posts[j].images[i]){
      if(posts[j].images[i].length<100)
      posts[j].images[i]= fs.readFileSync(posts[j].images[i], "base64");
            }
        }
       }}

   

    const mergedData = { user, posts };
    res.status(200).json(mergedData);

  }
  catch(err ){
      res.status(500).json({ error: err });
  };


}