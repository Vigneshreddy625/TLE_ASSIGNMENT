import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MongoDB connecte! HOST: ${connectionInstance.connection.host} \n`);
    }
    catch(err){
        console.error(`Mongodb connection error ${process.env.PORT}`, err);
        process.exit(1);
    }
}

export default connectDB;