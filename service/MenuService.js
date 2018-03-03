/**
 * Created by simvolice on 27.02.2018 16:18
 */



const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {



    createCappedCollection: async () => {


        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {





            db.createCollection("menus", { capped: true, size: 5242880, max: 1 } );


        }catch(err) {



            return err;


        }




    },



    addMenus: async (menusArr) => {

        try {



            const col = dbConnect.getConnect().collection('menus');






            const result = await col.insertOne({





                menuArr: menusArr,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )





            });




            return result;


        }catch(err) {




            return err;


        }


    },




    getAllMenus: async (menusArr) => {

        try {



            const col = dbConnect.getConnect().collection('menus');






            const result = await col.find({}).toArray();




            return result;


        }catch(err) {




            return err;


        }


    },






};