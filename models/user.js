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
            required: true
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
        token: { type: String }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);