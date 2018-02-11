

function genParentChart(data) {


console.log(data);


    for (let dataCommon of data) {


        let tableBody = "";




            for (let itemRecordset of dataCommon.dataRow.recordset) {


                console.log(itemRecordset);



                let td = "";

                for (let itemOfRecordObj in itemRecordset) {
                    if (dataCommon.categ.includes(itemOfRecordObj)){

                        td += ` <td class="tg-0ord">${itemRecordset[itemOfRecordObj]}</td>`;
                    }
                }



                tableBody += `<tr>
        <td class="tg-031e">${itemRecordset.Name}</td>
        <td class="tg-031e">${itemRecordset.Territory}</td>
        ${td}
        
        
        
           
            </tr>`;



            }








        generateChart(dataCommon.data, dataCommon.idElem, dataCommon.titleCharts, dataCommon.categ, dataCommon.fileUrl, dataCommon.fileName, dataCommon.description, dataCommon.chartType, data, tableBody)




    }









}


function generateChart(data, idElem, titleDiagramm, categ, fileUrl, fileName, description, chartType, allData, tableBody) {



    let labelSpan = "";
    let tableHead = "";

    let downloadButton = "";
    let fixedFileName = [];


    for (let obj of fileName) {
        fixedFileName.push(obj.substring(0,20));
    }





    let idName = 0;
    for (let urlDownloadButton of fileUrl) {

        downloadButton += `<div class="upload-btn-wrapper downloadButtton" >
                                
                                    <md-icon class="material-icons downloadIcon">file_download</md-icon>
                                    <a href="${urlDownloadButton}"
                                       style="text-decoration: none; color: white">${fixedFileName[idName]}
                                       </a>
                               
                               </div>`;

        idName++;
    }

    for (let changeDataChartArrItem of categ) {

        labelSpan += `<span class="label dateTitle" data-dateval="${changeDataChartArrItem}" data-nametable="${titleDiagramm}" data-id="${idElem}" data-typechart="${chartType}">${changeDataChartArrItem}</span>`

        tableHead += `<th class="tg-hgcj">${changeDataChartArrItem}</th>`


    }














    let templateForChart = `<md-card class="text-center test123">
                    <div class="row">

                    <div class="col-md-6 btnRow" >
                            
                           ${downloadButton}
                           
                    </div>
 
                    <div class="col-md-6 custom__label__date text-right">
                             
                             ${labelSpan}
        
                    </div>

             </div>
              



    <h3 class="title" style="text-transform: uppercase">${titleDiagramm}</h3>
    
    
    <div id="${idElem}"></div>
    
    
    <div class="row">
        <div class="col-md-12">
            <h3 class="decription"> Описание диаграммы </h3>
            <h4 class="decription__text">${description}</h4>
        </div>
        
    </div>
    
    
    
     <div class="row">
        <div class="col-md-12">
            
         <style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0; width: 100%}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-0ord{text-align:right}
.tg .tg-hgcj{font-weight:bold;text-align:center}
</style>
<table class="tg table-striped">
  <tr>
    <th class="tg-hgcj">Наименование</th>
    <th class="tg-hgcj">Территория</th>
    
    ${tableHead}
    
  </tr>
  ${tableBody}
</table>
        </div>
        
    </div>
    
    
    
   
    
    

</md-card>`;













    let resultForChart = [];
    let tempArr = [];
    let tempArr2 = [];

    $("#title").after(templateForChart);





    for (let itemData of data) {



        for (let item of itemData) {

            tempArr.push(_.groupBy(item, "yearName")) ;

        }
    }






    let lastElem = tempArr[tempArr.length - 1];


    for (let itemLastElem in lastElem) {
        for (let itemOfArr of lastElem[itemLastElem]) {

            resultForChart.push(itemOfArr.categName);



            for (let obj of itemOfArr.data) {
                resultForChart.push(obj)
            }


            tempArr2.push(resultForChart);

            resultForChart = [];

        }
    }






    genChart(tempArr2, idElem, chartType);









    $(".dateTitle").unbind().on('click', function(event) {





        event.preventDefault();
        let tempArr3 = [];
        let tempArr4 = [];
        let resultChartLoadDataByYear = [];





        for (let itemTableOne of allData) {


            if(itemTableOne.titleCharts === $(this).data("nametable")){



                for (let itemData of itemTableOne.data) {

                    for (let item of itemData) {

                        tempArr3.push(_.groupBy(item, "yearName")) ;

                    }
                }




            }

        }


        for (let [index, itemLastElem] of tempArr3.entries()) {




            for (let obj in itemLastElem) {





                if (parseInt(obj) === $(this).data("dateval")){

                    for (let obj1 of itemLastElem[obj]) {


                        tempArr4.push(obj1.categName);

                        for (let obj2 of obj1.data) {


                            tempArr4.push(obj2);
                        }
                        resultChartLoadDataByYear.push(tempArr4);
                        tempArr4 = [];
                    }












                }

            }

        }



        genChart(resultChartLoadDataByYear, $(this).data("id"), $(this).data("typechart"));

        $('.dateTitle').removeClass('active__options');
        $(this).addClass('active__options');




    });




}


function genChart(data, idElem, typeChart) {





   bb.generate({

        bindto: "#" + idElem,

        data: {

            columns: data,

            type: typeChart

        },


        legend: {
            show: true
        },


        bar: {
            width: {
                ratio: 0.5
            }

        },


        grid: {
            x: {
                show: false
            },
            y: {
                show: false
            }
        },

        axis: {
            x: {
                show: true

            },
            y: {
                show: false
            }
        },
        labels: {

            format: function (val) {
                return d3.format(",.2f")(val);
            }
        },
        tooltip: {
            format: {
                title: function (d) { return 'Значения'; },
                value: function (value, ratio, id) {

                    return d3.format(",.2f")(value);
                }
            }
        },


    });





}