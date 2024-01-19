import { MongoClient } from "mongodb";

let client;
export const connectToMongodb = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client = clientInstance;
        console.log("connected to DB");
        createIndexes(client.db());
        
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getClient = ()=>{
    return client;
}

export const getDB = ()=>{
    return client.db();

};

const createIndexes = async(db)=>{
    try{

        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1, categories:-1});
        await db.collection("products").createIndex({desc:"text"})
    }catch(err){
        console.log(err);
    }
    console.log("created Indexes");
}
