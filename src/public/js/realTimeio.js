const socketClient = io()

socketClient.on("enviandoProductos",(products)=>{
    // console.log(products);
    updata(products)
    
})


function updata(products) {
    let div=document.getElementById("lista");
    let listaproductos="";
    products.forEach((product) => {
        listaproductos += `<div class="card " style="width:17rem">
        <img src="${product.thumbnails}" class="card-img-top" height="50%" />
        <div class="card-body row justify-content-center">
          <h5 class="card-title text-center">${product.title}</h5>
          <p class="card-text text-center">${product.price}</p>
      
        </div>
        <a href="#" class="btn btn-primary text-center my-2">Ver Detalle</a>
      </div>`
    });

div.innerHTML=listaproductos

}



// socketClient.emmit("mesage", "enviado de formulario")

// const formulario= document.getElementById("formulario")
// formulario.onsubmit =(e=>{
//     e.preventDefault()

// socketClient.on("productos", productos => {
//   fs.readFile('./src/productos.json', 'utf-8')
//     .then((data) => {
//       const productos = JSON.parse(data);
//       Socket.on('productos', productos);
//     })
//     .catch((error) => {
//       console.error('Error al leer productos.json:', error);
//     });
// })



// })