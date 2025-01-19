import mongoose from "mongoose";


const  connectdb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log('MongoDB Connected Succesfully');
    }catch(e){
        console.log('Error Connecting to MongoDB' , e);
        process.exit(1);
    }
    
};


export default connectdb;