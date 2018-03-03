const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;








module.exports = {






    deleteOnePost: async (id) => {



        try {



            const col = dbConnect.getConnect().collection('posts');




            const result = await col.deleteOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }





    },


    getAllPost: async () => {



        try {



            const col = dbConnect.getConnect().collection('posts');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }





    },



    addPost: async (objParams) => {

        try {



            const col = dbConnect.getConnect().collection('posts');



            const result = await col.insertOne({





                iframepowerbi: objParams.iframepowerbi,
                menuUniqueKey: objParams.menuUniqueKey,
                titlepost: objParams.titlepost,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )






            });




            return result;


        }catch(err) {



            return err;


        }


    },



    getOnePost: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('posts');




            const result = await col.findOne({menuUniqueKey: Int32(id)});




            return result;


        }catch(err) {



            return err;


        }


    }







};