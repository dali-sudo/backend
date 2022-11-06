import User from "../models/user.js";
import emailValidator from 'deep-email-validator';


export async function signin(req, res) {
  const {valid, reason , validators} = await isEmailValid(req.body.email) ;
  if (valid) 
  {
    
    User.findOne({ email: req.body.email, password: req.body.password })
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


  }
  else  return res.status(400).send({
    message : "Please provide a valid email adress.", 
    error : validators[reason].reason,
    
  })
  
}

export async function signup(req, res) {
  const {valid, reason , validators} = await isEmailValid(req.body.email) ;
  if (valid) {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
      //avatar: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newUser) => {
        res.status(200).json({
          username: newUser.username,
          password: newUser.password,
          email: newUser.email
         // avatar: newUser.avatar,
        });
      
      })
      .catch((err) => {
        res.status(500).json({ error: err });
        
        
      });
  }
  else return res.status(400).send({
    message : "Please provide a valid email adress.", 
    error : validators[reason].reason
  })

}

export function putOnce(req, res) {
  let newUser = {};
  if(req.file == undefined) {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
  }
  else {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    //  avatar: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }
  }
  User.findByIdAndUpdate(req.params.id, newUser)
    .then((doc1) => {
      User.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
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