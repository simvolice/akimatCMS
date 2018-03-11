let express = require('express');
let bcryptjs = require('bcryptjs');
let slug = require('slug');
let path = require('path');
let fs = require('fs');
let util = require('util');

let fileReaderNew = util.promisify(fs.readFile);

let busboy = require('async-busboy');

const XLSX = require('xlsx');


const jsonwebtoken = require('jsonwebtoken');



let AuthService = require('../service/AuthService');
let checkSession = require('../utils/checkSession');


let PostsService = require('../service/PostsService');
let UtilsService = require('../service/UtilsService');
let MsqlService = require('../service/MsqlService');
let MenuService = require('../service/MenuService');






let router = express.Router();













router.get("/getallroles", async (req, res, next) => {

    if (await checkSession(req, "read")){



        let result = await AuthService.getAllRoles();


        res.json({code: 0, resultFromDB: result});



    } else {


        res.json({code: 1});



    }



});


router.post("/adduser", async(req, res, next) => {

    if (await checkSession(req, "AuthService")){



        let result = await AuthService.addUsers(req.body);





        res.json({code: 0, resultFromDB: result.ops[0]._id});




    } else {

        res.json({"code": 1});


    }






});



router.get("/getallusers", async (req, res, next) => {


    if (await checkSession(req, "read")) {


        let result = await AuthService.getAllUsers();


        res.json({code: 0, resultFromDB: result.slice(2)});


    } else {



        res.json({"code": 1});

    }


});


router.post("/updateusers", async(req, res, next) => {



    if (await checkSession(req, "AuthService")) {


        let result = await AuthService.updUsers(req.body);


        res.json({code: 0, resultFromDB: result});

    } else {



        res.json({"code": 1});


    }



});



router.post("/deleteoneusers", async(req, res, next) => {



    if (await checkSession(req, "AuthService")) {


        let result = await UtilsService.deleteByIdCommon(req.body._id, "users");


        res.json({code: 0, resultFromDB: result});

    } else {


        res.json({"code": 1});

    }



});







router.post('/auth', async(req, res, next) => {





    let result = await AuthService.auth(req.body.name);



    if (result) {


        if (bcryptjs.compareSync(req.body.pass, result.pass)) {





            res.json({"code": 0, "sessionToken": jsonwebtoken.sign(result._id.toString(), process.env.SECRETJSONWEBTOKEN)});


        }else {

            res.json({"code": 1});


        }

    }else {

        res.json({"code": 1});



    }








});



router.get("/getalltable", async(req, res, next) => {




    if (await checkSession(req, "read")) {


        let result = await MsqlService.getTables();
        let resultAllTable = [];


        if (result.hasOwnProperty("recordset")) {

            for (let itemTable of result.recordset) {

                resultAllTable.push(itemTable.TABLE_NAME);

            }

        }



        res.json({code: 0, resultFromDB: resultAllTable});

        resultAllTable = [];
        result = [];


    } else {


        res.json({"code": 1});


    }


});




router.post("/getdatafrommssql", async(req, res, next) => {


    if (await checkSession(req, "read")) {


        let result = await MsqlService.getDataFromOneTable(req.body.tableName);


        if (result.hasOwnProperty("recordset")) {

            res.json({code: 0, resultFromDB: result.recordset});


        } else {

            res.json({code: 1});

        }

        result = [];


    } else {


        res.json({"code": 1});


    }


});




router.post("/deleteonetable", async(req, res, next) => {

    if (await checkSession(req, "MsqlService")) {


        let result = await MsqlService.deleteOneTable(req.body.tableName);


        if (result.recordset === undefined) {

            res.json({code: 0});

        } else {

            res.json({code: 1});

        }


    } else {


        res.json({"code": 1});

    }




});


router.post("/insertnewdata", async(req, res, next) => {




    if (await checkSession(req, "MsqlService")) {


        await MsqlService.insertNewData(req.body.tableName, req.body.changes[0]);


        res.json({code: 0});


    } else {


        res.json({"code": 1});

    }



});









router.post("/checkadminpage", async(req, res, next) => {





    let result = await AuthService.checkID(req.body.sessionToken);


    if (result === null){

        res.json({code: 1});
    } else {

        res.json({code: 0});
    }




});






router.post("/addpost", async(req, res, next) => {


    if (await checkSession(req, "PostsService")) {


        let result = await PostsService.addPost(req.body);


        if (result.result.ok === 1) {

            res.json({"code": 0});


        } else {


            res.json({"code": 1});


        }


    } else {



        res.json({"code": 1});



    }



});







router.post("/deleteonepost", async (req, res, next) => {



    if (await checkSession(req, "PostsService")) {


        let result = await PostsService.deleteOnePost(req.body.id);

        if (result.result.ok === 1) {

            res.json({"code": 0});

        } else {

            res.json({"code": 1});

        }


    } else {


        res.json({"code": 1});


    }


});

router.get("/getallpost", async (req, res, next) => {


    if (await checkSession(req, "read")) {


        let result = await PostsService.getAllPost();


        res.json({code: 0, resultFromDB: result});


    } else {

        res.json({"code": 1});

    }

});








router.get('/getonepost', async (req, res, next) =>{


    let result = await PostsService.getOnePost(req.query.id);




    res.json({"code": 0, "resultFromDb": result});


});





router.post("/addexcel", async(req, res, next) => {



    if (await checkSession(req, "MsqlService")) {


        const {files, fields} = await busboy(req);


        let records = [];


        for (let fileItem of files) {


            const workbook = XLSX.readFile(fileItem.path);
            let tableName = path.parse(fileItem.filename).name;


            let allList = workbook.SheetNames;


            let onlyFirst = workbook.Sheets[allList[0]];


            let allArrResult = XLSX.utils.sheet_to_json(onlyFirst);


            records = allArrResult;


            await MsqlService.insertOneTable(tableName, records);

            records = [];
        }


        res.json({code: 0});


    } else {


        res.json({"code": 1});


    }





});



function setSlugForTree(menusArr) {


    menusArr.childs = menusArr.childs
        .map(function (child) {


            child["url"] = slug(child.title, {lower: true});


            return child;


        }).map(function (child) {
            return setSlugForTree(child);
        });


    return menusArr;

}



router.post('/savemenu', async (req, res, next) =>{




    if (await checkSession(req, "MenuService")) {


        let clearArr = [];


        for (let itemOneMenuObj of req.body.menus) {
            let tempArr = itemOneMenuObj;


            clearArr.push(setSlugForTree(tempArr));

            tempArr = [];

        }


        for (let itemOneParentObj of clearArr) {
            itemOneParentObj["url"] = slug(itemOneParentObj.title, {lower: true});

        }


        let result = await MenuService.addMenus(clearArr);


        if (result.result.ok === 1) {

            res.json({"code": 0});


        } else {


            res.json({"code": 1});


        }

    } else {

        res.json({"code": 1});


    }



});



router.get('/allmenus', async (req, res, next) =>{







        let result = await MenuService.getAllMenus();


        res.json({"code": 0, "resultFromDb": result});







});






module.exports = router;
