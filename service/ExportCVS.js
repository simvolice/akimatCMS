const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {








    addCVS: async (tableName, cvsArr) => {

        try {



            const colForListTable = dbConnect.getConnect().collection("listTable");
            await colForListTable.insertOne({tableName: tableName});


            const col = dbConnect.getConnect().collection(tableName);




            const result = await col.insertMany(cvsArr);




            return result;


        }catch(err) {



            return err;


        }


    },



    getTables: async () => {

        try {



            const colForListTable = dbConnect.getConnect().collection("listTable");





            const result = await colForListTable.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    }










};