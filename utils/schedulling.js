const UtilsService = require('../service/UtilsService');
const MsqlService = require('../service/MsqlService');



module.exports = {

    checkTableInMSSQL: async ()=> {








        setInterval(async () => {

            let resultFromMongoDB = await UtilsService.allGetTable();
            let resultFromMSSQL = await MsqlService.getTables();
            let tempArrMSSQL = [];




            for (let nameTableMSSQL of resultFromMSSQL.recordset) {


                tempArrMSSQL.push(nameTableMSSQL.TABLE_NAME);


            }


            for (let nameTableMongo of resultFromMongoDB) {



                if (!tempArrMSSQL.includes(nameTableMongo.nameTable)) {



                    await UtilsService.deleteById(nameTableMongo._id);


                }




            }

        }, 30000)














    },






};