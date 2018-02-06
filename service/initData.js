

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

                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

            },

                {


                    title: "Линейная диаграмма",
                    imgUrl: "chartsImg/LineChart.PNG",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Кольцевая диаграмма",
                    imgUrl: "chartsImg/DonutChart.PNG",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    title: "Столбцовая диаграмма",
                    imgUrl: "chartsImg/BarChart.PNG",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                }






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
            col.createIndex({ title : 1 }, {unique: true});


            const result = await col.insertMany([





                {

                    id: 0,
                    title: "Социально-экономическое развитие",
                    childItem: [

                        "Валовый региональный продукт",
                        "Промышленность",
                        "Инвестиции",
                        "Сельское хозяйство",
                        "Предпринимательство",
                        "Инфляция",
                        "Торговля",
                        "Архитектура и строительство",
                        "Бюджет",
                        "ЖКХ И ЭНЕРГЕТИКА",
                        "Транспорт",
                        "Координация занятости и социальная защита",
                        "Здравоохранение",
                        "Образование",
                        "Молодежная политика",
                        "Культура",
                        "Религия",
                        "Ветеринария",
                        "Оперативные данные",
                        "Спорт",
                        "Инновации",

                    ],

                    url: "/?#!/main",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },


                {

                    id: 0,
                    title: "Бюджет области",
                    childItem: [

                        "Бюджет",
                        "Исполнение бюджета",


                    ],

                    url: "/?#!/main",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    id: 1,
                    title: "budget",
                    childItem: [

                        "Бюджет",
                        "Структура доходов",
                        "Динамика доходов (план)",
                        "Динамика расходов (план)",
                        "Структура расходов",
                        "В разрезе программ",
                        "В разрезе администраторов",
                        "В разрезе направлений (отраслей)",
                        "В разрезе районов",
                        "Чистое бюджетное кредитование",
                        "Сальдо по операциям с финансовыми активами",
                        "Финансирование дефицита (использование профицита) бюджета"

                    ],

                    url: "/?#!/main",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                },

                {


                    id: 2,
                    title: "budgetIspol",
                    childItem: [

                        "Основные показатели исполнения бюджета",
                        "Исполнение. Структура доходов",
                        "Динамика доходов (факт)",
                        "Динамика расходов (факт)",
                        "Исполнение. Структура расходов",
                        "Исполнение. В разрезе программ",
                        "Исполнение. В разрезе администраторов",
                        "Исполнение. В разрезе направлений (отраслей)",
                        "Исполнение. В разрезе районов",
                        "Чистое бюджетное кредитование",
                        "Сальдо по операциям с финансовыми активами",
                        "Финансирование дефицита (использование профицита) бюджета"

                    ],

                    url: "/?#!/main",

                    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),

                }







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



    }






};