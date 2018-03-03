/**
 * Created by simvolice on 01.03.2018 14:51
 */

const AuthService = require("../service/AuthService");

module.exports = {


    rbac: async (roleId, nameService) => {





        if (roleId === "root") {

            return true;

        } else {


            let roleObj = await AuthService.getRoleById(roleId);



            if (roleObj.acl.includes(nameService)) {


                return true;

            } else {



                return false;


            }


        }
































    }











};