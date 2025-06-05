import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected");
        
    } catch (err) {
        console.log(`Error in Connecting DB ${err}`);
        process.exit(1) //To stop whole process , if there is issue , (1) -> true
    }
}

export default connectDB;