import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        race : {
            type : String, 
            required : true,
           
        },
        avatar: {
            type: String,
            required: false
        }, 

        sexe: { type: String , 
        required : false
        },
        
        owner: {  type: Schema.Types.ObjectId, ref: 'User' , 
            required : false
        },

        age: { type: String , 
            required : false
        }
    },
    {
        timestamps: true
    }
);

export default model('Pet', petSchema);