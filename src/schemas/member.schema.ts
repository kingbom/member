import { Schema } from 'mongoose';
export const MemberSchema = new Schema({
    id: Number,
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
});