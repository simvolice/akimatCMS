

const dbConnect = require('../utils/ConnectMSQL');






module.exports = {








    getTables: async () => {

        try {



            const pool = dbConnect.getConnect();




            const result = await pool.query`SELECT * FROM INFORMATION_SCHEMA.TABLES`;




            return result;


        }catch(err) {



            return err;


        }


    },





};