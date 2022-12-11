import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chatroomSchema = new Schema(
    {
               
                Users: [{ type: Schema.Types.ObjectId, ref: 'User' , 
                required : false
        }],
        chat:[ { 
            message:{type:String,required : true},
            type:{type:String,required : true},
            senderid:{type: Schema.Types.ObjectId, ref: 'User' , required : false }
},]
        }, 
    


{
    timestamps: true
}
);
export default model('chatroom', chatroomSchema);