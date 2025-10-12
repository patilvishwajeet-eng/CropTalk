import mongoose from 'mongoose';

const dbConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.CONN_STRING);
        console.log('connected to mongodb..');
    }
    catch(err){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;