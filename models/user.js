import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        email : {
            type : String, 
            required : true,
            unique : true
        },
        avatar: {
            type: String,
            required: false
        }, 
        token: { type: String , 
        required : false},
        followingcount: {
            type: Number,
        },
        following: [ { type: Schema.Types.ObjectId, ref: 'User' }],
        followerscount: {
            type: Number,
        },
        followers: [ { type: Schema.Types.ObjectId, ref: 'User' }],
          RecoverCode:{
            type: String , 
        required : false
          }
    }
    ,
    {
        timestamps: true
    }
);

export default model('User', userSchema);