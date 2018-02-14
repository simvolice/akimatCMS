

function genParentChart(data) {




    for (let dataCommon of data) {





        let tableBody = "";
        let categByTerritory = [];






        for (let itemRecordset of dataCommon.dataRow.recordset) {




            categByTerritory.push(itemRecordset.Territory);


                let td = "";

                for (let itemOfRecordObj in itemRecordset) {
                    if (dataCommon.categ.includes(itemOfRecordObj)){

                        td += ` <td class="tg-0ord">${itemRecordset[itemOfRecordObj]}</td>`;
                    }
                }



                //TODO Надо подумать над полной динамикой таблиц

                tableBody += `<tr>
        <td class="tg-031e">${itemRecordset.Name}</td>
        <td class="tg-031e">${itemRecordset.Territory}</td>
        ${td}
        
        
        
           
            </tr>`;



            }








        generateChart(dataCommon.data, dataCommon.idElem, dataCommon.titleCharts, dataCommon.categ, dataCommon.fileUrl, dataCommon.fileName, dataCommon.description, dataCommon.chartType, data, tableBody, dataCommon.axisRotate, dataCommon.stackBar, categByTerritory)




    }









}


function generateChart(data, idElem, titleDiagramm, categ, fileUrl, fileName, description, chartType, allData, tableBody, axisRotated, stackBar, categByTerritory) {




    let descriptionVisible = "";


    if (description === "undefined"){


        descriptionVisible = "collapse";

    } else {


        descriptionVisible = "visible";
    }





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
    
    
    <div class="row" style="visibility: ${descriptionVisible};">
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













    $("#title").after(templateForChart);



    let lastArr = [];


    for (let obj of data) {
        lastArr = obj.slice(-1);
    }



       genChart(_.flattenDeep(lastArr)[0].data, idElem, chartType, axisRotated, stackBar, categByTerritory);

















    $("div.custom__label__date>span:last-child").addClass('active__options');












    $(".dateTitle").unbind().on('click', function(event) {
        event.preventDefault();



        let resultChartLoadDataByYear = [];






        for (let itemTableOne of allData) {


            if(itemTableOne.titleCharts === $(this).data("nametable")){



                for (let itemData of itemTableOne.data) {

                    for (let itemOneObj of itemData) {
                        for (let itemOneObjTemp of itemOneObj) {
                            if (Number.parseInt(itemOneObjTemp.yearName) === $(this).data("dateval")){

                                resultChartLoadDataByYear = itemOneObjTemp.data;

                            }
                        }

                    }





                }




            }

        }





        genChart(resultChartLoadDataByYear, $(this).data("id"), $(this).data("typechart"), axisRotated, stackBar, categByTerritory);





        $('.dateTitle').removeClass('active__options');
        $(this).addClass('active__options');




    });




}


function genChart(data, idElem, typeChart, axisRotated, stackBar, categByTerritory) {





        bb.generate({

            bindto: "#" + idElem,

            data: {

                columns: [data],


                type: typeChart,


                labels: {

                    format: function (val) {
                        return d3.format(",.2f")(val);
                    }
                }
            },


            groups: [
                stackBar
            ],

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

                rotated: axisRotated,
                x: {

                    type: "category",
                    categories: categByTerritory,

                    show: true

                },
                y: {
                    show: false
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