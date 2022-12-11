import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        },
        type:{
            type : String, 
            required : true, 
        },
        title: {
            type : String, 
            required : true, 
        },
        content: {
            type: String,
            required: false
        }, 
    
          is_read: { type:Boolean , 
        required : false
        },
         
         created_at: { type:Date , 
            required : true
            },
    },
    {
        timestamps: true
    }
);

export default model('Notification', notificationSchema);