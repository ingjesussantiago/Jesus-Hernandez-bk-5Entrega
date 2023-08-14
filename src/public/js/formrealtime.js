const socketClient = io()

let form = document.getElementById("formularioIo")
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title =form.elements.title.value;
    let descripcion = form.elements.descripcion.value;
    let code = form.elements.code.value;
    let price = form.elements.price.value;
    let status= form.elements.status.value;
    let stock=form.elements.stock.value;
    let category= form.elements.category.value;
    // let file =form.elements.file;


    socketClient.emit("addProduct",{
        title,
        descripcion,
        code,
        price,
        status,
        stock,
        category,
        // file:

    })

    form.reset();

// console.log("enviados");

 })

 document.getElementById("buttonDelete").addEventListener("click",function(){
    const borrarinput=document.getElementById("idProducto");
    const borrarid=parseInt(borrarinput.value);
    socketClient.emit("borraProducto",borrarid);
    borrarinput.value="";
 });

 





 