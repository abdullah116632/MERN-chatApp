import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connect to DB")
    }catch(error){
        console.log("Error connect to MongoDb", error.message)
    }
}

export default connectToMongoDB;