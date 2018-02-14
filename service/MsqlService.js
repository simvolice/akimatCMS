

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




    insertOneTable: async (tableNameArr, dataArr) => {


        for (let tableOneName of tableNameArr) {
            for (let dataArrOne of dataArr) {

                const table = new sql.Table(`atcms_${tableOneName}`); // or temporary table, e.g. #temptable
                table.create = true;


                for (let allColumn of Object.keys(dataArrOne[0])) {
                    table.columns.add(allColumn, sql.NVarChar(255), {nullable: true});


                }




                for (let oneObjItem of dataArrOne) {



                        table.rows.add(...Object.values(oneObjItem));




                }





                const request = new sql.Request();

                request.bulk(table, (err, result) => {

                })


            }

        }





    }







};