import moongoose from "mongoose";

export async function connect(){
    try {
        moongoose.connect(process.env.MONGO_DBURL!);
        const connection= moongoose.connection
        connection.on("connnected",()=>{
            console.log("MongoDB connected");
        })

        connection.on('error',(err)=>{
            console.log("MongoDB connection error plwase make sure db is up and running"+err);
            process.exit();
        })
    } catch (error) {
        console.log('Somethingg went wrong in connecting to db');
        console.log(error);
        
    }
}