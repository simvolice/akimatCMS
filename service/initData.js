const MongoClient = require('mongodb').MongoClient;


module.exports = {


    initRoles: async () => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);


        try {


            const col = await db.collection('roles');


            col.createIndex({namerole: 1}, {unique: true});


            const result = await col.insertMany([







                {

                    namerole: "Аналитик",

                    acl: ["MenuService", "MsqlService", "PostsService", "read"],


                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                },


                {

                    namerole: "Аким",

                    acl: ["read"],



                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                },

                {

                    namerole: "Заместитель акима",
                    acl: ["read"],


                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                },


                {

                    namerole: "Руководитель управления",
                    acl: ["read"],


                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),

                },


            ]);


            return result;


        } catch (err) {


            return err;


        }


    }


};