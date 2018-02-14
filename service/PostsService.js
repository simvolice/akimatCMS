const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








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





                titleCharts: objParams.title,
                tableName: objParams.tabels,
                pageId: ObjectId(objParams.pages),
                chipsArr: objParams.parameters.split(","),
                description: objParams.description,
                chartId: ObjectId(objParams.chartModel),
                fileName: objParams.fileNameArr,
                fileUrl: objParams.fileUrlArr,
                typeDiagramm: objParams.typediagramm




            });




            return result;


        }catch(err) {



            return err;


        }


    },



    getOnePost: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('posts');




            const result = await col.find({





                pageId: ObjectId(id)




            }).toArray();




            return result;


        }catch(err) {



            return err;


        }


    }







};