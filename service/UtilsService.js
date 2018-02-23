const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {


    aliasCreate: async (aliasTable, nameTable) => {


        try {



            const col = dbConnect.getConnect().collection('table_list');




            const result = await col.insertOne({

                nameTable: nameTable,
                aliasTable: aliasTable,



            });




            return result;


        }catch(err) {



            return err;


        }






    },



    allGetTable: async () => {


        try {



            const col = dbConnect.getConnect().collection('table_list');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }






    },


    deleteById: async (id) => {


        try {



            const col = dbConnect.getConnect().collection('table_list');




            const result = await col.deleteOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }






    },



    deleteByIdCommon: async (id, nameTable) => {


        try {



            const col = dbConnect.getConnect().collection(nameTable);




            const result = await col.deleteOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }






    }

















};