const Database = require('./db.js')
const createProffy = require('./createProffy')

Database.then(async(db) => {

    // Inserir dados
    proffyValue = {
        name: "Fernando Oliveira",
        avatar: "https://avatars.githubusercontent.com/u/78318959?s=400&u=5fbe4bbbeacc1685af8120b5d79e887b54645d07&v=4",
        whatsapp: "9999-9999",
        bio: "Descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição",
    }

    classValue = {
        subject: 1,
        cost: "20",
        //o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to:  1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to:  1220
        }
    ]
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)


    // consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    // console.log(selectClassesSchedules)
})