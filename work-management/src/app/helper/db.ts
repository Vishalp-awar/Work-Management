
// import mongoose from "mongoose";
// const connectDb = async() =>{

//     try{
//        const {connection}= await mongoose.connect(process.env.MONGO_DB_URL,{
//             dbName:"work_manager",
//         })
//         console.log("db connected");
//         console.log(connection);
//     }catch(error){
//         console.log("error in con")

//     }
// }

// export default connectDb;

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL || 'vishal@2550', {
      dbName: "work_manager",
      serverSelectionTimeoutMS: 20000,
    });
    // console.log("Database connected successfully");
    // console.log(connection);
  } catch (error) {
    console.error("Error connecting to the database:",  error);
  }
};

export default connectDb;
