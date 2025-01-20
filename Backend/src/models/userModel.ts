import mongoose,{Document,Model,Schema} from "mongoose";

interface IUser extends Document{
name: string;
email:string;
passsword?:string;
id:string;    
}

const UserSchema: Schema<IUser>= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passsword:{
        type:String,
        required:false,
    },
})

const User:Model<IUser> = mongoose.model<IUser>("User",UserSchema);


export default User;