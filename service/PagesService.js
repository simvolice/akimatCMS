

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {

    getAllData: async (nameTable) => {

        try {




          let col = dbConnect.getConnect().collection(nameTable);



          let result = await col.find({}).toArray();






          return result;







        }catch(err) {




            return err;


        }

    },


    getPageType: async (id) => {

        try {




            let col = dbConnect.getConnect().collection("list_page");



            let result = await col.findOne({_id: ObjectId(id)});









            return result;







        }catch(err) {




            return err;


        }

    },

    deleteTempTable: async (nameTable) => {

        try {




            dbConnect.getConnect().collection(nameTable).drop();







        }catch(err) {


            console.log("\x1b[42m", err);

            return err;


        }

    },


    getChartById: async (id) => {

        try {




            const col = dbConnect.getConnect().collection("charts");




            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }


    },

    getDataForDynamicPage: async (tableName, categArr, typeDiagramm) => {


        try {




            const col = dbConnect.getConnect().collection(tableName);

            let result = [];



            for (let itemOfCateg of categArr) {

                result.push( await col.aggregate(


                    [

                    {$match: {}},


                    { $group : { _id : itemOfCateg, value: { $push: "$$ROOT" } } },




                    { $group : { _id : "$value." + itemOfCateg, categName: { $addToSet: "$value.Name" }} },



                    {
                        $project:
                            {


                                categNameFirst: { $arrayElemAt: [ "$categName", 0 ] },

                            }
                    },

                           {
                            $project:
                                   {


                                       categName: { $arrayElemAt: [ "$categNameFirst", 0 ] },

                                   }
                           },

                           {
                               $addFields: {
                                   "yearName": itemOfCateg,
                                   data: "$_id"
                               }
                           },

                           {
                               $project:
                                   {


                                       _id: 0,



                                   }
                           },



                ],






                ).toArray())

            }






            for (let itemOfResult of result) {
                for (let obj of itemOfResult) {



                    let tempArr = [];

                    tempArr.push(obj.categName);



                    for (let [index, obj1] of obj.data.entries()) {



                       obj1 = obj1.replace(/,/g, ".");
                       obj1 = obj1.replace(/ /g, "");

                        obj1 = Number.parseFloat(obj1);

                        tempArr.push(obj1);

                    }

                    obj.data = tempArr;
                }
            }





            return result;


        }catch(err) {



            return err;


        }






    },





    insertFromMSSQL: async (flattenArr, tableName) => {


        try {


            await dbConnect.getConnect().collection(tableName).insertMany(flattenArr, {w: "majority", wtimeout: 100000});


        } catch (err) {


            console.log("\x1b[42m", err);

            return err;


        }




    },

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