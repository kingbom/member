import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function IsComparePassword(property: string, validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        if(!validationOptions){ //or validationOptions == undefined
            validationOptions = {};
            validationOptions.message = 'password and confirm password do not match.';
        }
        registerDecorator({
            name: "IsComparePassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value === args.object[property];
                }
            }
        });
   };
}