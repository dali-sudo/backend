import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import auth from './middlewares/auth.js'
import { Server, Socket } from "socket.io";
import { notFoundError, errorHandler } from './middlewares/error-handler.js';


import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import petRoutes from './routes/pet.js';
import chatroomRoutes from './routes/chatroom.js';
import notification from './routes/notifications.js';
import swagger from './swagger.js';
const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'Petbook';
const MONGOUSER='mongo'
const MONGOPASSWORD='cGoppOKOnWLtoyvRHrw2'
const MONGOHOST='containers-us-west-44.railway.app'
const MONGOPORT='8052'

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
.connect(`mongodb://127.0.0.1/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());
  
  app.use(morgan('dev'));
  app.use(express.json({limit: '50mb'}));
  //app.use(express.urlencoded({ extended: true }));
  //app.use('/img', express.static('public/images'));




// Serve Swagger UI

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/pet', petRoutes);
app.use('/chat', chatroomRoutes);
app.use('/notification', notification);
app.use('/', swagger);

app.post("/user/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});


/*
app.use(notFoundError);
app.use(errorHandler);
*/
const server=app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})


var clients =[];

const io=new Server(server)
io.on('connection',(server)=>{
  console.log("new connection"+server.id);
  server.on('storeClientInfo', function (data) {
    var clientInfo = new Object();
    clientInfo.customId = data;
    clientInfo.clientId= server.id;
    clients.push(clientInfo);
    console.log(clients)
});
 server.on('send',function (data) {
  console.log("send"+data)
  for( var i=0, len=clients.length; i<len; ++i ){
    var c = clients[i];

    if(c.customId == data){
        server.to(c.clientId).emit("refresh")
        console.log("refresh"+data)
        break;
    }
}
var id= 
 server.to()
});


server.on('disconnect', function (data) {

  for( var i=0, len=clients.length; i<len; ++i ){
      var c = clients[i];

      if(c.clientId ==server.id){
        console.log("disconnect"+server.id)
          clients.splice(i,1);
          break;
      }
  }
})
;
})
;