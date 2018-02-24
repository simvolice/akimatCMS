

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


            for (let itemObj of result.recordset) {

                delete itemObj["id"];

            }


            return result;


        }catch(err) {



            return err;


        }


    },




    insertOneTable: async (tableOneName, dataArr) => {




        const arrMonth = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];


        const table = new sql.Table(`atcms_${tableOneName}`); // or temporary table, e.g. #temptable
        table.create = true;




        table.columns.add("id", sql.Int, {nullable: true});



            for (let oneColumn of Object.keys(dataArr[0])) {

                if (Number.isInteger(Number.parseInt(oneColumn))) {

                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                } else if (oneColumn.includes("_kv")) {


                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                } else if (oneColumn.includes("Percent")) {


                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }


                else if (oneColumn.includes("2017 за 9 мес")) {

                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }

                else if (oneColumn.includes("кв")) {

                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }

                else if (oneColumn.includes("Plan")) {

                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }else if (oneColumn.includes("percent")) {


                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }else if (arrMonth.includes(oneColumn)) {


                    table.columns.add(oneColumn.trim(), sql.Float, {nullable: true});


                }

                else {

                    table.columns.add(oneColumn.trim(), sql.NVarChar(1000), {nullable: true});


                }


            }






            for (let [index, oneObjItem] of dataArr.entries()) {



                table.rows.add(index, ...Object.values(oneObjItem));


            }





        const request = new sql.Request();

        request.bulk(table, (err, result) => {


            console.log("\x1b[42m", err);

        })





    },




    deleteOneTable: async (tableName) => {

        try {



            const pool = dbConnect.getConnect();




            let result = await pool.request()
                .input(`${tableName}`, sql.TVP)
                .query(`DROP TABLE ${tableName}`);






            return result;


        }catch(err) {



            return err;


        }


    },

    insertNewData: async (tableName, changes) => {












        if (Number.isNaN(Number.parseFloat(changes[3])) === true) {



            const request = new sql.Request();


            request.input(`${tableName}`, sql.TVP);

            request.input(`${changes[3]}`, sql.NVarChar(1000));

            request.input(`${changes[1]}`, sql.NVarChar(1000));
            request.input(`${changes[0]}`, sql.Int);
            request.query(`UPDATE ${tableName} SET "${changes[1]}" = \'${changes[3]}\' WHERE id = ${changes[0]};`, (err, result) => {
                console.log(err)
            })


        } else {

            const request = new sql.Request();


            request.input(`${tableName}`, sql.TVP);


            request.input(`${changes[3]}`, sql.Float);

            request.input(`${changes[1]}`, sql.NVarChar(1000));
            request.input(`${changes[0]}`, sql.Int);
            request.query(`UPDATE ${tableName} SET "${changes[1]}" = ${changes[3]} WHERE id = ${changes[0]};`, (err, result) => {
                console.log(err)
            })

        }





    },









};