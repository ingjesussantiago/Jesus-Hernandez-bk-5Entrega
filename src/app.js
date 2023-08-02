import express from "express"
import { __dirname } from "./utils.js"
import productosRouter from "./routers/productos.Router.js"
import timeProductsRouter from "./routers/homeTimeproducts.Router.js"
import cartsRouter from "./routers/carts.Router.js"
import handlebars from "express-handlebars"
import {Server } from "socket.io"
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
  
const PORT =8080

 
const httpServer = app.listen(PORT, () => {
    console.log("escuchando puerto con htpp y socket io")
})
const socketServer = new Server(httpServer)

// socketServer.on("connection", () => {
//     console.log(`cliente conectado a servidor:`);





// socketServer.on("connection", (Socket) => {
//     console.log(`cliente conectado a servidor:${Socket.id}`);

    // Escuchar el evento "formSubmission" cuando el cliente envía el formulario
  // Socket.on("formSubmission", function(formData) {
  //   console.log("Datos del formulario recibidos:");
  //   console.log(formData);

    // Puedes realizar aquí cualquier acción adicional con los datos recibidos

    // // Por ejemplo, puedes emitir un evento a todos los clientes para informarles sobre la nueva entrada de formulario
    // socketServer.emit("newFormSubmission", formData);
  
    //   Socket.on('disconnect', () => {
    //     console.log(`Un cliente se ha desconectado:${Socket.id}`)
    //   })

    // Socket.on("enviarMensaje",(mensaje)=>{
    //     console.log(mensaje);

    //     Socket.broadcast.emit("enviarMensaje", mensaje)

    //   })

    //   Socket.emit("enviarMensaje",{
    //     usuario:"adm",
    //     mensaje:"bienvenido"
    //   });




// })
