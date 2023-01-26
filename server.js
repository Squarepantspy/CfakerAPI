// Importando el modulo express
const express = require("express") // lado server-backend
const app = express()
const PORT = 8000;

//Importando faker api lado backend
// npm install --save-dev @faker-js/faker
const {faker}= require('@faker-js/faker'); //importar lado backend

//para saber si el servidor esta corriendo esto tiene que estar debajo de los otros bloques de codigo
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


//Para el caso post, para poder acceder a los datos post, necesitamos extraerlos del objeto de solicitud. Para hacer eso hay que agregar una nueva configuracion
//Asegurarse que se encuentren por encima de cualquier bloque de codigo app.get o app.post
//MIDDLEWARE son intermediarios que se encargan de proporcionar y analizar los datos de request.body
//toma los datos del post y los añade al campo body del objeto request
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//GET
// ya tenemos la capacidad de crear nuevas rutas y enviar algunos datos
//req es request
//res es response
app.get("/api",(req,res)=>{
    res.json({message: "Hello world"});// es la respuesta que yo mando al que hace get a esa ruta
});



//FAKER API
class Usuario {
    constructor(){
        this.userId= faker.datatype.uuid();
        this.username= faker.internet.userName();
        this.email= faker.internet.email();
        this.avatar= faker.image.avatar();
        this.password= faker.internet.password();
        this.birthdate= faker.date.birthdate();
        this.registeredAt= faker.date.past();
    }
}


class Empresa {
    constructor(){
        this.nombre = faker.company.name();
        this.buzzword =  faker.company.bsBuzz();
        this.bsNoun = faker.company.bsNoun();
        this.frase = faker.company.catchPhrase();
    }
}

//simulando una base de datos
const usuarios= [];
const empresas= [];

//RUTA QUE DEVUELVA UN NUEVO USUARIO 
app.get("/api/users/new",(req,res)=>{
    const User =  new Usuario(); // se crea un objeto instancia de usuario
    usuarios.push(User);
    res.json(User); //se manda el ususario en response
    //console.log(User)
})

//RUTA QUE DEVUELVA UNA NUEVA COMPAÑIA
app.get("/api/companies/new",(req,res)=>{
    const Emp = new Empresa();
    empresas.push(Emp);
    res.json(Emp);
    //console.log(Emp);
})

//DEVUELVE UN NUEVO USUARIO Y UNA NUEVA EMPRESA
app.get("/api/user/company",(req,res)=>{
    const Emp = new Empresa();
    const User = new Usuario();
    res.json({Emp,User})//acordarse de mandar un objeto para que se pueda convertir a json
    //console.log({Emp,User})
})

//post
app.post("/crearUsuario",(req,res)=>{
    console.log(req.body)// al hacer post la informacion llega por req
    res.json(req.body)// una respuesta para saber si llego o no
})

//editar con put
app.put("/editarusuario/:id/:nombre",(req,res)=>{
    const id = req.params.id; //recibe los parametros de la url
    console.log(usuarios);
    console.log(id);
    const nuevosdatos = usuarios.map((person)=>{
        if (person.userId==id){
            person.username=req.params.nombre; //cambia el nombre con la informacion que llega por la url
        }
        return person //acordarse de retornar el elemento que se mapea
    })
    res.json(nuevosdatos);
})

//delete 
app.delete("/borrarusuario/:id",(req,res)=>{
    const id = req.params.id
    const newarray = usuarios.filter((person)=>person.userId!==id) //retorna los person id que sean desigual a el 
    res.json(newarray);
})
//todos los usuarios
app.get("/todosusuarios",(req,res)=>{
    res.json({usuarios})
})