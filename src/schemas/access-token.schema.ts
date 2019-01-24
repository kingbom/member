import { Schema } from 'mongoose';
export const accessTokenSchema = new Schema({
    memberId : Schema.Types.ObjectId,
    accessToken : String,
    exprise : Date,
    created : {
        type: Date ,
        default: Date.now
    }
});