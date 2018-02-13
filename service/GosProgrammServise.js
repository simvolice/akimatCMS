const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;








module.exports = {


    addPost: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('gosprograms');


            const result = await col.insertOne({


                Pasport: objParams.programPasport,
                Description: objParams.programmDescription,
                NameDev: objParams.programmNameDev,
                Target: objParams.programmTarget,
                TargetIndicator: objParams.programmTargetIndicator,
                ActionPlan: objParams.programmActionPlan,
                DescriptionAction: objParams.programmDescriptionAction,
                FinansAction: objParams.programmFinansAction,
                TargetDescrIndicator: objParams.programmTargetDescrIndicator,
                DimicIndicator: objParams.programmDimicIndicator

            });


            return result;


        } catch (err) {


            return err;


        }


    },

}