import { Document } from "mongoose";
import { access } from "fs";

export interface IAccessToken extends Document {
    memberId: any,
    accessToken: String,
    exprise: Date,
    created: Date

}