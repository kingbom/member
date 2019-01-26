import { IMemberDocument } from "./member.interface";

export interface IAuthen {
    generateAccessToken(member: IMemberDocument): Promise<String>;

    validateUser(accessToken: string): Promise<IMemberDocument>;
}