const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {









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