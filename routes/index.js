let express = require('express');
let bcryptjs = require('bcryptjs');
let AuthService = require('../service/AuthService');
let PagesService = require('../service/PagesService');
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



    let result = await PagesService.getAllPages();


    res.json({code: 0, resultFromDB: result});





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






module.exports = router;
