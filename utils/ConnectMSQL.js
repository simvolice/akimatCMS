


const mssql = require('mssql');



let state = {
    db: null
};


module.exports = {


    connect: async () => {


        try {


            state.db = await mssql.connect(process.env.DB_MSQLHOST);





        } catch (err) {



            state.db = err;


        }


    },


    getConnect: () => {

        return state.db;


    }


};