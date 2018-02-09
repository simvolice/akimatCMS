let express = require('express');
let bcryptjs = require('bcryptjs');
let slug = require('slug');
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




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/dynamicpage", async(req, res, next) => {


    let resultFromDB = await PostsService.getOnePost(req.query.id);
    let dataFromMssql = [];

    let randomPrefix = getRandomInt(1, 1000000);




    for (let [index, obj] of resultFromDB.entries()) {

        dataFromMssql.push(await MsqlService.getDataFromOneTable(obj.tableName));

        await PagesService.insertFromMSSQL(dataFromMssql[index].recordset, obj.tableName + randomPrefix);

    }













    let resultAllTable = [];

    for (let itemResult of resultFromDB) {


        let chartUrl = await PagesService.getChartById(itemResult.chartId);

        let result = await PagesService.getDataForDynamicPage(itemResult.tableName + randomPrefix);
        let resultArr = [];
        let categ = [];



        let tempArr = [];


        const regExpress = /[0-9]/g;


        tempArr = result.slice(0,1);



        tempArr = tempArr[0].value[0];

        for (let obj in tempArr) {
            if (regExpress.test(obj)){

                categ.push(obj);

            }
        }


        for (let itemResultFromMongoDB of result) {


            let resultArrTemp = [];

            resultArrTemp.push(itemResultFromMongoDB._id);

            for (let itemGroup of itemResultFromMongoDB.value) {


                for (let key in itemGroup) {

                    if (regExpress.test(key)){

                        resultArrTemp.push(itemGroup[key]);


                    }

                }



            }


            resultArr.push(resultArrTemp);


        }





        resultAllTable.push({"titleCharts": itemResult.titleCharts, "data": resultArr, "categ": categ, "description": itemResult.description, "fileName": itemResult.fileName, "fileUrl": itemResult.fileUrl, "chartUrltoScript": chartUrl.urlToScript, "idElem": slug(itemResult.titleCharts, {lower: true})});


        await PagesService.deleteTempTable(itemResult.tableName + randomPrefix);

    }





    res.json({code: 0, resultFromDB: resultAllTable});





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
