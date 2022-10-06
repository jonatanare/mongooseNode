import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`


/*
mongoosse nos ofrece

Modelo (término de mongoose)
    Es una interfaz para comunicarnos con la BD
        - Crear
        - Actualizar
        - Editar
        - Consultar
Para crear un modelo necesitamos un Schema

Schema:
    Nos permitirá definir la estructura de los documentos
        - Que campos (name, lastName, age, ...)
        - Validaciones (requerido, )
        - restricciones
*/

// Schema de Koders
const koderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    gender: {
        type: String,
        required: true,
        enum: ['h', 'm'] // que valores son validos para este campo
    },
    isGradruate: {
        type: Boolean,
        default: false // tenga un valor por defecto
    }
});

// crear el modelo
//                           (nombre de la colleccion a la que hacemos referencia, schema)
const Koders = mongoose.model('koders', koderSchema)

// El modelo nos permite comunicarme a la base de datos

mongoose.connect(URL)
    .then( async (connection) => {
        // console.log('Conexión Exitosa!');
        // Obtener a todos los koders
        const allKoders = await Koders.find({}) // regresa una promesa
        console.log(allKoders);

        // Crear a un koder
        /*const newKoder = {
            name: 'Hector',
            lastName: 'Barboza',
            gender: 'h',
            generation: 21,
            age: 26,
            isGradruate: false
        }

        const koderCreated = await Koders.create(newKoder)
        console.log(koderCreated);*/
        
        // Actualizar a un koder
        /*const newData = {
            lastName: 'Arevalo'
        }

        const koderUpdated = await Koders.findByIdAndUpdate('633cee238718e9aabc23cc6e',newData, {new: true})
        console.log('Koder updated');
        console.log(koderUpdated);*/

        // Eliminar un koder
        /*const koderDeleted = await Koders.findByIdAndRemove('633eeee20bf380fdfd52bd37')
        console.log(koderDeleted);*/
    })
    .catch((error) => {
        console.log('Erros: ', error);
    })