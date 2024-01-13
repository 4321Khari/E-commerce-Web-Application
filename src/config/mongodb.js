import { MongoClient } from "mongodb";


let client;
export const connectToMongodb = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client = clientInstance;
        console.log("connected to DB");
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getDB = ()=>{
    return client.db();

};
