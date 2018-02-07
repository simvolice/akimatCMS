

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {








    getAllPages: async () => {

        try {




            const col = dbConnect.getConnect().collection('list_page');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },

    getAllCharts: async () => {

        try {



            const col = dbConnect.getConnect().collection('charts');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },


    getAllOptions: async () => {

        try {



            const col = dbConnect.getConnect().collection('options_pages');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },



    getAllStructure: async () => {

        try {




            const col = dbConnect.getConnect().collection('structure_rashod');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },
    getAllIspolStructure: async () => {

        try {




            const col = dbConnect.getConnect().collection('ispol_structure_rashod');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },


};