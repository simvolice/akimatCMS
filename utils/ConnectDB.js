
const MongoClient = require('mongodb').MongoClient;

const Logger = require('mongodb').Logger;
Logger.setLevel('debug');


let state = {
    db: null
};


module.exports = {


    connect: async () => {


        try {


            let client = await MongoClient.connect(process.env.DB_HOST);

            state.db = client.db(process.env.DB_NAME);







        } catch (err) {

            state.db = err;


        }


    },


    getConnect: () => {

        return state.db;


    }


};