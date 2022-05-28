const inquirer = require('inquirer');
require("colors");



const Preguntas = [{
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
        {
            value: 1,
            name: `${'1.'.yellow} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.yellow} Historial`
        },
        {
            value: 0,
            name: `${'0.'.yellow} Salir`
        }
    ]
}
]


const inquirerMenu = async () => {
    console.clear();
    console.log("========================".gray)
    console.log("  Selecione una opción  ".blue)
    console.log("========================\n".gray)

    const { opcion } = await inquirer.prompt(Preguntas)
    return opcion;

}
const pause = async () => {
    const Pauseenter = [
        {
            type: "input",
            name: "Pause",
            message: `Precione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(Pauseenter)
}

const leerInpt = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingresa un valor";
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question)

    return desc;
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}`.gray
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`,

        }
    })
    choices.unshift({
        value:"0",
        name:"0.".yellow + "Cancelar"
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: "Seleccione el lugar que busca",
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const question = [
        {
            type:"confirm",
            name:"ok",
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.gray
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:(tarea.completadoEn)? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: "Selecionar",
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}
module.exports = {
    inquirerMenu,
    pause,
    leerInpt,
    listarLugares, 
    confirmar,
    mostrarListadoChecklist
}