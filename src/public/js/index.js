
const socketClient=io()

 
socketClient.on("connect",()=>{
console.log(`conectado al servidor:vista navegador console`)

socketClient.on("disconnect",()=>{
 console.log("perdimos conexion al servidor")

})

})


