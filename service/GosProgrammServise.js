const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {


    addPost: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('gosprograms');


            const result = await col.insertOne({


                titleProgram: objParams.title,
                description: objParams.description,
                fullDescription: objParams.fullDescription,


            });


            return result;


        } catch (err) {


            return err;


        }


    },

}