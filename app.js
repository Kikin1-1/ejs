const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');



//generar el objeto principal

let datos = JSON.parse(fs.readFileSync("datos.json","utf8"));
let data = JSON.parse(fs.readFileSync("productos.json","utf8"));
let info = JSON.parse(fs.readFileSync("alumnos.json","utf8"));
const app = express();
app.set("view engine", "ejs");

app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.render("index",{titulo:"Listado de Alumnos",listado:datos});
})
app.get("/papeleria", (req,res)=>{
    const params = {
        tipo: parseFloat(req.query.tipo),
        lista: data,
       
    }
    res.render("preexamen",params);
})
app.post("/papeleria", (req,res)=>{
    const params = {
        tipo: parseInt(req.body.tipo),
        lista: data,
    }
    res.render("preexamen",params);
})
app.get("/calificaciones", (req,res)=>{
    const params = {
        nivel: parseFloat(req.query.nivel),
        turno: parseFloat(req.query.turno),
        vista: parseFloat(req.query.vista),
        inf: info,
       
    }
    res.render("examen",params);
})
app.post("/calificaciones", (req,res)=>{
    const params = {
        nivel: parseInt(req.body.nivel),
        turno: parseInt(req.body.turno),
        vista: parseInt(req.body.vista),
        inf: info,
    }
    res.render("examen",params);
})

app.get("/practica1",(req,res)=>{
    res.render("practica01",{numero:""});
})



app.get("/cotizacion",(req,res)=>{
    const params = {
        valor: req.query.valor,
        pinicial: req.query.pinicial,
        plazos: req.query.plazos,
    }
    res.render("practica02",params);
})
app.post("/cotizacion",(req,res)=>{
    const params = {
        valor: req.body.valor,
        pinicial: req.body.pinicial,
        plazos: parseInt(req.body.plazos),
    }
    res.render("practica02",params);
})

app.get("/pago",(req,res)=>{
    const params = {
        numRecibo: req.query.numRecibo,
        nombre: req.query.nombre,
        puesto: req.query.puesto,
        nivel: req.query.nivel,
        diasTrabajados: req.query.diasTrabajados,
    }


    res.render("practica03",params);
})
app.post("/pago",(req,res)=>{
    const params = {
        numRecibo: parseInt(req.body.numRecibo),
        nombre: req.body.nombre,
        puesto: parseFloat(req.body.puesto),
        nivel: parseFloat(req.body.nivel),
        diasTrabajados: req.body.diasTrabajados,
    }
    res.render("practica03",params);
})
app.get("/docentes",(req,res)=>{
    const params = {
        docente: req.query.docente,
        nombre: req.query.nombre,
        domicilio: req.query.domicilio,
        nivel: req.query.nivel,
        pago: req.query.pago,
        horas: req.query.horas,
        hijos: req.query.hijos,
    }


    res.render("recuperacion",params);
})
app.post("/docentes",(req,res)=>{
    const params = {
        docente: req.body.docente,
        nombre: req.body.nombre,
        domicilio: req.body.domicilio,
        nivel: parseFloat(req.body.nivel),
        pago: req.body.pago,
        horas: req.body.horas,
        hijos: parseFloat(req.body.hijos),
    }
    res.render("recuperacion",params);
})


app.post("/p01",(req,res)=>{
    // parametros a recibir los datos
    const params = {
        numero: req.body.numero,
    }
    res.render("practica01",params);
    //body : cuando los datos viene de un formulario por el metodo post
    //       : Usa libreria    

});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
