import { Schema } from 'mongoose';
export const MemberSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    position: String,
    image: String,
    role: Number,
    created: {
        type: Date, default: Date.now
    },
    updated: {
        type: Date, default: Date.now
    }
}, {toObject : { virtuals: true } });   