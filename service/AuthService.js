

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const bcrypt = require('bcryptjs');





module.exports = {






    addUsers: async (objParams) => {
        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.insertOne({




                        name: objParams.name,
                        roleId: ObjectId(objParams.roleId),
                        pass: bcrypt.hashSync(objParams.newPass, 10),
                        createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),





                }
            );




            return result;


        }catch(err) {



            return err;


        }





    },

    updUsers: async (objParams) => {


        try {



            const col = dbConnect.getConnect().collection('users');




            if (objParams.newPass === "") {

                const result = await col.updateOne({_id: ObjectId(objParams._id)}, {
                        $currentDate: {
                            lastModified: true
                        },
                        $set: {



                            name: objParams.name,
                            roleId: ObjectId(objParams.roleId),


                        }

                    }
                );

                return result;


            } else {


                const result = await col.updateOne({_id: ObjectId(objParams._id)}, {
                        $currentDate: {
                            lastModified: true
                        },
                        $set: {



                            name: objParams.name,
                            roleId: ObjectId(objParams.roleId),
                            pass: bcrypt.hashSync(objParams.newPass, 10),


                        }

                    }
                );

                return result;


            }









        }catch(err) {



            return err;


        }










    },



    getAllUsers: async () => {


        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }










    },



    getAllRoles: async () => {

        try {



            const col = dbConnect.getConnect().collection('roles');




            const result = await col.find({}).toArray();




            return result;


        }catch(err) {



            return err;


        }


    },


    getRoleById: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('roles');




            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }


    },



    auth: async (name) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.findOne({name: name});




            return result;


        }catch(err) {



            return err;


        }


    },

    checkID: async (id) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {



            return err;


        }


    },



    createUserSuperRoot: async (hash) => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('users');
            col.createIndex({ name : 1 }, {unique: true});



            const result = await col.insertMany([{


                pass: hash,
                name: "admin",
                roleId: "root",

                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

            },
                {


                    pass: "$2a$08$UY04wuRblkJ8rGwHrdGpieH049LtniVYmDOcprfn18ZTjaBCVk2SC",
                    name: "yevgeniy",
                    roleId: "root",
                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                }

                ]);






            return result;


        }catch(err) {



            return err;


        }


    }





};