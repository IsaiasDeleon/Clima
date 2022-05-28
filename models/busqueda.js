const fs = require('fs')

const axios = require('axios');

class Busquedas{
    historial = []
    dbPath="./db/database.json";
        constructor(){
            //leer la base de datos 
            this.leerDB();
        }
        get historialCapatalizado(){
            return this.historial
            this.historial.forEach()
            //'your string'.replace(/\b\w/g, l => l.toUpperCase())
        }
        get paramsMapbox(){
            return {
                'access_token':process.env.MAPBOX_KEY,
                'limit':5,
                'language':'es'
            }
        }
        get paramsClima(){
            return{
                'appid':process.env.OPENWEATHER,
                'units':'metric',
                'lang':'es'
            }
        }
        async ciudad ( lugar = ''){
            try {

                const intance = axios.create({
                    baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                    params:this.paramsMapbox
                })
                const resp =  await intance.get();
                return  resp.data.features.map( lugar => ( { 
                    id: lugar.id,
                    nombre:lugar.place_name,
                    lng:lugar.center[0],
                    lat: lugar.center[1]
                } ))
               
               
            } catch (error) {
                return [];
            }
            //console.log(lugar)
            
            
            
        }

        async climaLugar( lat, lon){
            try {
                //instance axios.create()
                const instance = axios.create({
                    baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                    params:this.paramsClima
                })
                //resp.data
                const resp = await instance.get();
                return{
                    desc: resp.data.weather[0].description,
                    min:resp.data.main.temp_min,
                    max:resp.data.main.temp_max,
                    temp:resp.data.main.temp
                }

            } catch (error) {
                console.log(error)
            }
        }

        agregarHistorial ( lugar = ""){
            //Prevenir duplicados
            if(this.historial.includes ( lugar.toLocaleLowerCase())){
                return;
            }
            //Limitamos el historial
            this.historial= this.historial.slice(0,5)
            this.historial.unshift( lugar.toLocaleLowerCase() )

            //grabar db
            this.guardarDB();
        }
        guardarDB(){
            const h = {
                historial: this.historial
            }
            fs.writeFileSync(this.dbPath, JSON.stringify(h))
        }
        leerDB(){
            // debe de existir
            if(!fs.existsSync(this.dbPath)){
                return null;
            }
            // const info  readFilieSync  
            const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'}); 
            const data = JSON.parse(info);
            //igualamos el arreglo que tenemos con la db
            this.historial = data.historial;
        }
}
module.exports = Busquedas;