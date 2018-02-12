

const dbConnect = require('../utils/ConnectMSQL');


const sql = require('mssql');




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

    getDataFromOneTable: async (tableName) => {

        try {





            const pool = dbConnect.getConnect();



            let result = await pool.request()
                .input(`${tableName}`, sql.TVP)
                .query(`select * from ${tableName}`);


            return result;


        }catch(err) {



            return err;


        }


    },







};