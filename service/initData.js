

const dbConnect = require('../utils/ConnectDB');

const MongoClient = require('mongodb').MongoClient;





module.exports = {











    initDataForProtoPage: async () => {


        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('charts');
            col.createIndex({ title : 1 }, {unique: true});


            const result = await col.insertMany([

                {


                title: "Круговая диаграмма",
                imgUrl: "chartsImg/PieChart.PNG",
                type: "pie",
                    subType: null,
                    axisRotate: false,
                    stackBar: [],

                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

            },

                {


                    title: "Линейная диаграмма",
                    imgUrl: "chartsImg/LineChart.PNG",


                    type: "line",
                    subType: null,
                    axisRotate: false,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Кольцевая диаграмма",
                    imgUrl: "chartsImg/DonutChart.PNG",

                    type: "donut",
                    subType: null,
                    axisRotate: false,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Столбцовая диаграмма",
                    imgUrl: "chartsImg/BarChart.PNG",

                    type: "bar",
                    subType: null,
                    axisRotate: false,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Горизонтальная столбцовая диаграмма",
                    imgUrl: "chartsImg/horizontalBar.PNG",

                    type: "bar",
                    subType: null,
                    axisRotate: true,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Стэковая диаграмма",
                    imgUrl: "chartsImg/StackChart.PNG",

                    type: "bar",
                    subType: null,
                    axisRotate: false,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },


                {


                    title: "Столбцовая диаграмма вместе с линейной",
                    imgUrl: "chartsImg/hybrid.PNG",

                    type: "bar",
                    subType: "line",
                    axisRotate: false,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) ),

                },


                {


                    title: "Горизонтальная столбцовая диаграмма вместе с линейной",
                    imgUrl: "chartsImg/horisontalwithLine.PNG",

                    type: "bar",
                    subType: "line",
                    axisRotate: true,
                    stackBar: [],


                    createAt: new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) ),

                },











            ]);






            return result;


        }catch(err) {



            return err;


        }


    },


    initListPage: async () => {


        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('list_page');
            col.createIndex({ id : 1 }, {unique: true});


            const result = await col.insertMany([


                { "id":1,
                    title: "Валовый региональный продукт",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":2,
                    title: "Промышленность",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":3,
                    title: "Инвестиции",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":4,
                    title: "Сельское хозяйство",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":5,
                    title: "Предпринимательство",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":6,
                    title: "Инфляция",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":7,
                    title: "Торговля",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":8,
                    title: "Архитектура и строительство",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":9,
                    title: "Бюджет",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":10,
                    title: "ЖКХ и энергетика",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":11,
                    title: "Инновации",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },


                { "id":12,
                    title: "Транспорт",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":13,
                    title: "Координация занятости и социальная защита",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":14,
                    title: "Здравоохранение",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":15,
                    title: "Образование",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":16,
                    title: "Молодежная политика",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":17,
                    title: "Инспекция труда",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":18,
                    title: "Охрана земель",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":19,
                    title: "Земельные отношения",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":20,
                    title: "Культура",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":21,
                    title: "Религия",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },
                { "id":22,
                    title: "Ветеринария",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":23,
                    title: "Спорт", createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":24,
                    title: "Правопорядок", createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":25,
                    title: "ЧС", createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                {
                    "id":26,
                    title: "Внутренняя политика",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },

                { "id":27,
                    title: "Развитие языков", createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },



                { "id":28,
                    title: "Бюджет",
                    createAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
                },



                { "id":29,title: "Структура доходов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":30,title: "Динамика доходов (план)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":31,title: "Динамика расходов (план)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":32,title: "Структура расходов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":33,title: "В разрезе программ", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":34,title: "В разрезе администраторов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":35,title: "В разрезе направлений (отраслей)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":36,title: "В разрезе районов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":37,title: "Чистое бюджетное кредитование", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":38,title: "Сальдо по операциям с финансовыми активами", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":39,title: "Финансирование дефицита (использование профицита) бюджета", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},





                { "id":40, title: "Основные показатели исполнения бюджета", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":41, title: "Исполнение. Структура доходов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":42, title: "Динамика доходов (факт)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":43, title: "Динамика расходов (факт)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":44, title: "Исполнение. Структура расходов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":45, title: "Исполнение. В разрезе программ", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":46, title: "Исполнение. В разрезе администраторов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":47, title: "Исполнение. В разрезе направлений (отраслей)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":48, title: "Исполнение. В разрезе районов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":49, title: "Чистое бюджетное кредитование", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":50, title: "Сальдо по операциям с финансовыми активами", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                { "id":51, title: "Финансирование дефицита (использование профицита) бюджета", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),}








            ]);




            return result;





        }catch(err) {




            return err;


        }



    },


    initOption: async () => {


        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);




        try {




            const col = await db.collection('options_pages');
            col.createIndex({ title : 1 }, {unique: true});


            const result = await col.insertMany([





                {


                    title: "Добавить изменения по годам",



                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },


                {


                    title: "Добавить описание диаграммы",




                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {



                    title: "Добавить загрузку файла",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                }





            ]);






            return result;




        }catch(err) {


            return err;


        }



    },



    initStructureRashod: async () => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);



        try {


            const colAllPages = await db.collection('list_page');

            let resultAllPages = await colAllPages.find({}).toArray();




            let arrResult = [];

            for (let obj of resultAllPages) {
                if (obj.title === "Структура расходов"){

                    arrResult.push(obj);

                } else if(obj.title === "В разрезе программ"){


                    arrResult.push(obj);

                }else if(obj.title === "В разрезе администраторов"){


                    arrResult.push(obj);

                }else if(obj.title === "В разрезе направлений (отраслей)"){


                    arrResult.push(obj);

                }else if(obj.title === "В разрезе районов"){


                    arrResult.push(obj);

                }
            }




            const col = await db.collection('structure_rashod');
            col.createIndex({ title : 1 }, {unique: true});


            const result = await col.insertMany([





                {

                    _id: arrResult[0]._id,

                    title: "Структура расходов",



                    child: [

                        {  _id: arrResult[1]._id, title: "В разрезе программ", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[2]._id, title: "В разрезе администраторов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[3]._id, title: "В разрезе направлений (отраслей)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[4]._id, title: "В разрезе районов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},


                    ],



                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },





            ]);






            return result;


        }catch(err) {


            return err;


        }







    },




    initISpolStructureRashod: async () => {

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db(process.env.DB_NAME);



        try {


            const colAllPages = await db.collection('list_page');

            let resultAllPages = await colAllPages.find({}).toArray();




            let arrResult = [];

            for (let obj of resultAllPages) {
                if (obj.title === "Исполнение. Структура расходов"){

                    arrResult.push(obj);

                } else if(obj.title === "Исполнение. В разрезе программ"){


                    arrResult.push(obj);

                }else if(obj.title === "Исполнение. В разрезе администраторов"){


                    arrResult.push(obj);

                }else if(obj.title === "Исполнение. В разрезе направлений (отраслей)"){


                    arrResult.push(obj);

                }else if(obj.title === "Исполнение. В разрезе районов"){


                    arrResult.push(obj);

                }
            }




            const col = await db.collection('ispol_structure_rashod');
            col.createIndex({ title : 1 }, {unique: true});


            const result = await col.insertMany([





                {

                    _id: arrResult[0]._id,

                    title: "Исполнение. Структура расходов",



                    child: [

                        {  _id: arrResult[1]._id, title: "Исполнение. В разрезе программ", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[2]._id, title: "Исполнение. В разрезе администраторов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[3]._id, title: "Исполнение. В разрезе направлений (отраслей)", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},
                        {  _id: arrResult[4]._id, title: "Исполнение. В разрезе районов", createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),},


                    ],



                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },





            ]);






            return result;


        }catch(err) {


            return err;


        }







    }








};