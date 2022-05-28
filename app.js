
require('dotenv').config()
const { inquirerMenu,
    pause, 
    leerInpt,
    listarLugares} = require('./helpers/inquirer');
const Busquedas = require("./models/busqueda");


const main = async () => {
    let opt;
    const busquedas = new Busquedas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Show message
                const search = await leerInpt('Ciudad:');
                //search place
                const Lugares = await busquedas.ciudad( search );
                //select place
                const idSelect = await listarLugares(Lugares);
                if(idSelect === "0")continue
           
                const lugarSelect = Lugares.find(l => l.id == idSelect)
                 //guardar DB
                busquedas.agregarHistorial(lugarSelect.nombre)

                //Get Data clima
                const clima = await busquedas.climaLugar(lugarSelect.lat,lugarSelect.lng)

                // Show data
                console.clear();
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', lugarSelect.nombre.green)
                console.log('Lat:', lugarSelect.lat)
                console.log('Lng:', lugarSelect.lng)
                console.log('Tempreatura:', clima.temp)
                console.log('Mínima:',clima.min)
                console.log('Máxima:',clima.max)
                console.log('Clima:',clima.desc.green)
                break;
            case 2:
                busquedas.historial.forEach((lugar,i)=>{
                    const idx = `${i + 1}`.green;
                    lugar = lugar.replace(/\b\w/g, l => l.toUpperCase())
                    console.log(`${idx} ${lugar}`);
                })
                break;

        }
        if (opt != 0) await pause();
    } while (opt != 0);

}
main();
