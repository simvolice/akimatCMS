let express = require('express');
let bcryptjs = require('bcryptjs');
let slug = require('slug');
let path = require('path');
let fs = require('fs');
let util = require('util');

let fileReaderNew = util.promisify(fs.readFile);

let busboy = require('async-busboy');
let lodash = require('lodash');
let AuthService = require('../service/AuthService');
let PagesService = require('../service/PagesService');
let PostsService = require('../service/PostsService');
let ExportCVS = require('../service/ExportCVS');
let MsqlService = require('../service/MsqlService');
let GosProgrammServise = require('../service/GosProgrammServise');
let router = express.Router();

const parse = require('csv-parse');


let parceCVS = util.promisify(parse);



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


    let resultFromMongoDB = await ExportCVS.getTables();

    let result = await MsqlService.getTables();
    let resultArr = [];

    for (let tableItem of result.recordset) {

        resultArr.push(tableItem.TABLE_NAME);

        }


    for (let obj of resultFromMongoDB) {
        resultArr.push(obj.tableName);
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


        let resultFromMSSQL = await MsqlService.getDataFromOneTable(obj.tableName);


        if (resultFromMSSQL.hasOwnProperty("number")){

            dataFromMssql.push({"recordset": await PagesService.getAllData(obj.tableName)});

        } else {

            dataFromMssql.push(resultFromMSSQL);


        }


        console.log("\x1b[42m", resultFromMSSQL);


        await PagesService.insertFromMSSQL(dataFromMssql[index].recordset, obj.tableName + randomPrefix);

    }




    let resultAllTable = [];

    for (let [index, itemResult] of resultFromDB.entries()) {
        let result = [];

        let chartType = await PagesService.getChartById(itemResult.chartId);

        result.push(await PagesService.getDataForDynamicPage(itemResult.tableName + randomPrefix, itemResult.chipsArr));



        resultAllTable.push({"dataRow": dataFromMssql[index], "titleCharts": itemResult.titleCharts, "data": result, "categ": itemResult.chipsArr, "description": itemResult.description, "fileName": itemResult.fileName, "fileUrl": itemResult.fileUrl, "chartType": chartType.type, "idElem": slug(itemResult.titleCharts, {lower: true})});


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



router.post("/addcvs", async(req, res, next) => {


    const {files, fields} = await busboy(req);





    for (let fileItem of files) {




        let tempStr = await fileReaderNew(fileItem.path);




        let records = await parceCVS(tempStr.toString(), {columns: true, delimiter: ";"});


        await ExportCVS.addCVS(path.parse(fileItem.filename).name, records);






    }







   res.json({code: 0});






});


router.post("/getgosprogramm", async(req, res, next) => {


   let result = await GosProgrammServise.addPost(req.body);





   res.json({code: 0});






});





module.exports = router;
