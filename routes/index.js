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
let TabService = require('../service/TabService');
let PagesService = require('../service/PagesService');
let PostsService = require('../service/PostsService');
let UtilsService = require('../service/UtilsService');
let MsqlService = require('../service/MsqlService');
let GosProgrammServise = require('../service/GosProgrammServise');
let router = express.Router();

const parse = require('csv-parse');


let parceCVS = util.promisify(parse);



const jsonwebtoken = require('jsonwebtoken');





router.post("/getgosprogramm", async(req, res, next) => {


    let result = await GosProgrammServise.addPost(req.body);





    res.json({code: 0});






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


    let resultFromMongoDB = await UtilsService.allGetTable();



    res.json({code: 0, resultFromDB: resultFromMongoDB});


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
    } else {

        res.json({code: 0});
    }




});








function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/dynamicpage", async(req, res, next) => {


    let resultFromDB = await PostsService.getOnePost(req.query.id);




    let groupTab = lodash.groupBy(resultFromDB, "tabName");

    groupTab = Object.keys(groupTab);





    let pageType = await PagesService.getPageType(req.query.id);



     let dataFromMssql = [];

     let randomPrefix = getRandomInt(1, 1000000);




     for (let [index, obj] of resultFromDB.entries()) {



         dataFromMssql.push(await MsqlService.getDataFromOneTable(obj.tableName));


         await PagesService.insertFromMSSQL(dataFromMssql[index].recordset, obj.tableName + randomPrefix);

     }





    let resultAllTable = [];








         for (let [index, itemResult] of resultFromDB.entries()) {
             let result = [];


             let tabName = await TabService.getById(itemResult.tabName);









             let chart = await PagesService.getChartById(itemResult.chartId);


             if (chart.subType === "line"){


                 for (let obj of dataFromMssql) {

                     for (let obj1 of obj.recordset) {
                        console.log("\x1b[42m", lodash.groupBy(obj1, "I_kv"));
                     }



                 }




                 result.push(await PagesService.getDataForDynamicPageHybridBar(itemResult.tableName + randomPrefix, itemResult.chipsArr, itemResult.typeDiagramm));



                 resultAllTable.push({"typeDiagramm": itemResult.typeDiagramm, "idElemTab": slug(tabName.tabName, {lower: true}), "tabName": tabName.tabName,"dataRow": dataFromMssql[index], "titleCharts": itemResult.titleCharts, "data": result, "categ": itemResult.chipsArr, "description": itemResult.description, "fileName": itemResult.fileName, "fileUrl": itemResult.fileUrl, "chartType": chart.type, "idElem": slug(itemResult.titleCharts, {lower: true}), "typePage": pageType.type, "axisRotate": chart.axisRotate, "stackBar": chart.stackBar});


                 await PagesService.deleteTempTable(itemResult.tableName + randomPrefix);




             } else {

                 result.push(await PagesService.getDataForDynamicPage(itemResult.tableName + randomPrefix, itemResult.chipsArr, itemResult.typeDiagramm));



                 resultAllTable.push({"typeDiagramm": itemResult.typeDiagramm, "idElemTab": slug(tabName.tabName, {lower: true}), "dataRow": dataFromMssql[index], "titleCharts": itemResult.titleCharts, "data": result, "categ": itemResult.chipsArr, "description": itemResult.description, "fileName": itemResult.fileName, "fileUrl": itemResult.fileUrl, "chartType": chart.type, "idElem": slug(itemResult.titleCharts, {lower: true}), "typePage": pageType.type, "axisRotate": chart.axisRotate, "stackBar": chart.stackBar});


                 await PagesService.deleteTempTable(itemResult.tableName + randomPrefix);


             }



         }

    let tabName = [];


    for (let groupTabOne of groupTab) {


        let tempObj = await TabService.getById(groupTabOne);


        tempObj["idElemTab"] = slug(tempObj.tabName, {lower: true});

        tabName.push(tempObj);



    }



    res.json({code: 0, resultFromDB: resultAllTable, tabNames: tabName});





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


    let records = [];
    let tableName = [];


    for (let fileItem of files) {




        let tempStr = await fileReaderNew(fileItem.path);




         records.push(await parceCVS(tempStr.toString(), {columns: true, delimiter: ";"}));
         tableName.push(path.parse(fileItem.filename).name);






    }





    await MsqlService.insertOneTable(tableName, records);





    for (let tableOneName of tableName) {
        await UtilsService.aliasCreate(tableOneName, `atcms_${tableOneName}`);


    }


   res.json({code: 0});






});


router.post("/getgosprogramm", async(req, res, next) => {


   let result = await GosProgrammServise.addPost(req.body);





   res.json({code: 0});






});


router.post("/deleteonepost", async (req, res, next) => {


    let result = await PostsService.deleteOnePost(req.body.id);


    res.json({code: 0});


});

router.get("/getallpost", async (req, res, next) => {


    let result = await PostsService.getAllPost();


   res.json({code: 0, resultFromDB: result});


});

router.post("/sendnewtabname", async(req, res, next) => {



    let result = await TabService.createNewTab(req.body.tabName);



    res.json({code: 0, resultFromDB: result.ops[0]});





});


router.get("/getalltabs", async(req, res, next) => {


    let result = await TabService.getAll();



    res.json({code: 0, resultFromDB: result});







});






module.exports = router;
