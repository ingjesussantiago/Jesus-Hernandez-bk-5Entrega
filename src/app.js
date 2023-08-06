import express from "express"
import { __dirname } from "./utils.js"
import productosRouter from "./routers/productos.Router.js"
import timeProductsRouter from "./routers/homeTimeproducts.Router.js"
import cartsRouter from "./routers/carts.Router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import fs from 'fs/promises';
import { log } from "console"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))
app.use("/carts", cartsRouter)
app.use("/products", productosRouter)
app.use("/realTimeProducts", timeProductsRouter)




app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
    res.send("desde navegador 5")
})

app.get("/formulario", (req, res) => {
    res.render("formularioProducto")
})
app.get("/formRealTimeProducts", (req, res) => {
    res.render("formRealTimeProduct")
})

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("escuchando puerto con htpp y socket io")
})


const socketServer = new Server(httpServer)

socketServer.on("connection", (Socket) => {
    console.log(`cliente conectado a servidor:${Socket.id}`);

    Socket.on('disconnect', () => {
        console.log(`Un cliente se ha desconectado:${Socket.id}`)
    })

Socket.on("mesage", data=>{
    console.log(data);
})

});




//codigos de intentos
// Socket.broadcast.emit("nuevop","nuevoproducto")



    // // Cuando un cliente se conecta, le enviamos los productos actuales
    // fs.readFile('./src/productos.json', 'utf-8')
    //   .then((data) => {
    //     const productList = JSON.parse(data);
    //     socketServer.emit('productos', productList);
    //     console.log("enviando producto");
    //   })
    //   .catch((error) => {
    //     console.error('Error al leer productos.json:', error);
    //   });





