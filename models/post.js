import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
          descreption: {
            type: String,
            required: true
        },
         date: {
            type: Date,
            required: true
        },
        images:[{
            type: String
        }],
        owner : 
        { type: Schema.Types.ObjectId, ref: 'User' },
        likescount: {
            type: Number,
        },
        likes: [ { type: Schema.Types.ObjectId, ref: 'User' }], 
        tags : [{ 
            type: Schema.Types.ObjectId, ref: 'Pet'
        }]
    },
    
    {
        timestamps: true
    }
);

export default model('Post', postSchema);