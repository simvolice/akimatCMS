/**
 * Created by simvolice on 28.02.2018 23:38
 */







const AuthService = require('../service/AuthService');
const jsonwebtoken = require('jsonwebtoken');
const checkRoles = require('./checkRoles');


module.exports = async (req, nameService) => {







    let SeesionToken = req.body.sessionToken || req.get('sessionToken') || req.query.sessionToken;




    if (SeesionToken) {



            let userId= jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);

            let result = await AuthService.checkID(userId);

            if (result !== null) {

               return await checkRoles.rbac(result.roleId, nameService)

            } else {

                return false;


            }





    } else {



        return false;



    }
















};



