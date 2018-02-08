let express = require('express');
let bcryptjs = require('bcryptjs');
let path = require('path');
let fs = require('fs');
let busboy = require('async-busboy');
let lodash = require('lodash');
let AuthService = require('../service/AuthService');
let PagesService = require('../service/PagesService');
let PostsService = require('../service/PostsService');
let MsqlService = require('../service/MsqlService');
let router = express.Router();

const jsonwebtoken = require('jsonwebtoken');







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



  let result = await MsqlService.getTables();
  let resultArr = [];

    for (let tableItem of result.recordset) {

        resultArr.push(tableItem.TABLE_NAME);


    }

  res.json({code: 0, resultFromDB: resultArr});


});




router.get("/getallpages", async(req, res, next) => {


    let arrResult = [];

    let result = await PagesService.getAllPages();
    let resultStructure = await PagesService.getAllStructure();
    let resultIspolStructure = await PagesService.getAllIspolStructure();


    arrResult.push(result);
    arrResult.push(resultStructure);
    arrResult.push(resultIspolStructure);

    res.json({code: 0, resultFromDB: arrResult});





});


router.get("/getallcharts", async(req, res, next) => {





    let result = await PagesService.getAllCharts();


    res.json({code: 0, resultFromDB: result});





});


router.get("/getalloptions", async(req, res, next) => {



    let result = await PagesService.getAllOptions();


    res.json({code: 0, resultFromDB: result});





});


router.post("/checkadminpage", async(req, res, next) => {





let result = await AuthService.checkID(req.body.sessionToken);


if (result === null){

    res.json({code: 1});
}




});



router.get("/dynamicpage", async(req, res, next) => {


    let result = await PostsService.getOnePost(req.query.id);
    let dataFromMssql = [];
    let dataFromMssqlOnlyRecorset = [];

    let transportMatrixResult = [];




    for (let obj of result) {
        dataFromMssql.push(await MsqlService.getDataFromOneTable(obj.tableName));
    }


    for (let itemTable of dataFromMssql) {

        dataFromMssqlOnlyRecorset.push(itemTable.recordset);

    }




    for (let itemResult of dataFromMssqlOnlyRecorset) {
        transportMatrixResult.push(lodash.groupBy(itemResult, "Name"));

    }

    let tempArr = [];
    for (let obj of transportMatrixResult) {



        let tempArrValues = [];
        let tempArrCateg = [];


        tempArrValues.push(Object.keys(obj));
        for (let obj1 of obj) {

            tempArrValues.push(obj1.Value);

        }


        for (let obj1 of obj) {
            tempArrCateg.push(obj1.Param);
        }


        tempArr.push(tempArrValues);
        tempArr.push(tempArrCateg);

    }


    console.log("\x1b[42m", tempArr);

    res.json({code: 0, resultFromDB: 0});





});




router.post("/addpost", async(req, res, next) => {


 const {files, fields} = await busboy(req);



    let pathForWrite = path.join(__dirname, process.env.PATHUPLOAD);
    fields["fileNameArr"] = [];
    fields["fileUrlArr"] = [];

    for (let fileItem of files) {



       fields.fileNameArr.push(fileItem.filename);
       fields.fileUrlArr.push(`uploads/${path.basename(fileItem.path)}`);

        fileItem.pipe(fs.createWriteStream(pathForWrite + path.basename(fileItem.path)));

    }



    let result = await PostsService.addPost(fields);



   if (result.hasOwnProperty("result")){

       res.json({code: 0});

   } else {
       res.json({code: 1});
   }











});






module.exports = router;
