import mongoose from "mongoose";
mongoose.set('strictQuery', false);


export const Connection = async (username, password) =>{
    const URL =`mongodb+srv://${username}:${password}@addressupadter.roo3fne.mongodb.net`;
    try{
         await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
         console.log('Database Connected.')
    }
    catch(error){
        console.log('Error while connecting with DB ',error.message);
    }
}

export default Connection; 