

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {








    auth: async (name) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.findOne({name: name});




            return result;


        }catch(err) {



            return err;


        }


    },

    checkID: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }


    },



    createUserSuperRoot: async (hash) => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('users');
            col.createIndex({ name : 1 }, {unique: true});



            const result = await col.insertOne({


                pass: hash,
                name: "admin",

                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

            });






            return result;


        }catch(err) {



            return err;


        }


    }





};