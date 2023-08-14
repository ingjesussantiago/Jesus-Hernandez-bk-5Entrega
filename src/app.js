import express from "express"
import { __dirname } from "./utils.js"
import productosRouter from "./routers/productos.Router.js"
import viewRouter from "./routers/view.Router.js"
import cartsRouter from "./routers/carts.Router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import fs from 'fs/promises';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))
app.use("/carts", cartsRouter)
app.use("/products", productosRouter)
app.use("/", viewRouter)




app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")



const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("escuchando puerto con htpp y socket io")
})


const socketServer = new Server(httpServer)

import { managerProducto } from "../managerProducto.js";

const ManagerProductoSocket = new managerProducto(__dirname + "/productos.json")

socketServer.on("connection", async (Socket) => {
    console.log(`cliente conectado a servidor:${Socket.id}`)


    const products = await ManagerProductoSocket.getProduct({})
    socketServer.emit("enviandoProductos", products)

    Socket.on("addProduct", async (obj) => {
        await ManagerProductoSocket.addProduct(obj)
    })


    Socket.on("borraProducto",async(obj)=>{
        await ManagerProductoSocket.delateProductById(obj)
        
    })






    Socket.on('disconnect', () => {
        console.log(`Un cliente se ha desconectado:${Socket.id}`)
    })

});








