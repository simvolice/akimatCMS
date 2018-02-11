

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



    insertCVS: async (allColumns, fileName="TestTable3") => {


        try {





            const pool = dbConnect.getConnect();



            const result = await pool.request()
                .input(`${fileName}`, sql.TVP)
                .query(`CREATE TABLE ${fileName};`);


            for (let itemCol of allColumns) {
                await pool.request()
                    .input(`${fileName}`, sql.TVP)
                    .input(`${itemCol}`, sql.NVarChar(255))
                    .query(`ALTER TABLE ${fileName}
ADD ${itemCol} nvarchar(255);`

                    );
            }




            return result;


        }catch(err) {




            return err;


        }



    }




};