import mongoose,{Document,Model,Schema} from "mongoose";

interface IUser extends Document{
name: string;
username:string;
password?:string;
id:string;    
}

const UserSchema: Schema<IUser>= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false,
    },
})

const User:Model<IUser> = mongoose.model<IUser>("User",UserSchema);


export default User;