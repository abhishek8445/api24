import mongoose from "mongoose";

const Dbpath = 'mongodb://localhost:27017/bank'
const connection = async () => {
   try {
      await mongoose.connect(Dbpath)
      console.log(`database connection successfully`);
   }
   catch (err) {
      console.log(`database connnection Failed ${err}`);
   }
}


export default connection
