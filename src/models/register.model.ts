
import { IRegister } from "src/interfaces/app.interface";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";

export class RegisterModel implements IRegister {

    @IsNotEmpty({message: 'firstname is required'})
    firstname: string;

    @IsNotEmpty({message: 'lastname is required'})
    lastname: string;
    
    @IsNotEmpty({message: 'email is required'})
    @IsEmail()
    email: string;
    
    @IsNotEmpty({message: 'password is required'})
    @Matches(/^[A-z0-9]{6,15}$/)
    password: string;
    
    @IsNotEmpty({message: 'cpassword is required'})
    @Matches(/^[A-z0-9]{6,15}$/)
    cpassword: string;
}