const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {


    addPost: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('gosprograms');


            const result = await col.insertOne({


                Pasport: objParams.Pasport,
                Description: objParams.Description,
                NameDev: objParams.NameDev,
                Target: objParams.Target,
                TargetIndicator: objParams.TargetIndicator,
                ActionPlan: objParams.ActionPlan,
                DescriptionAction: objParams.DescriptionAction,
                FinansAction: objParams.FinansAction,
                TargetDescrIndicator: objParams.TargetDescrIndicator,
                DimicIndicator: objParams.DimicIndicator

            });


            return result;


        } catch (err) {


            return err;


        }


    },

}