const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {






    createNewTab: async (tabName) => {



        try {



            const col = dbConnect.getConnect().collection('tab_names');




            const result = await col.insertOne({tabName: tabName}, {upsert: true});




            return result;


        }catch(err) {



            return err;


        }





    },



    getAll: async () => {



        try {



            const col = dbConnect.getConnect().collection('tab_names');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }





    },




    getById: async (id) => {


        try {



            const col = dbConnect.getConnect().collection('tab_names');




            const result = await col.findOne({_id: ObjectId(id)});



            if (result === null){





                return 0;


            } else {

                return result;


            }







        }catch(err) {



            return err;


        }








    }





};