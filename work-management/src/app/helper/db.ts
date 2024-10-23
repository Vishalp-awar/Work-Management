
import mongoose from "mongoose";
const connectDb = async() =>{

    try{
       const {connection}= await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"work_manager"
        })
        console.log("db connected");
        console.log(connection);
    }catch(error){
        console.log("error in con")

    }
}

export default connectDb;