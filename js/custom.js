/* Variable global */

let arrayCatalogo = new Array();
let numPage;

/* Leer parámetros URL*/
let parametroURL = new URLSearchParams(location.search);

/* Comprobar página */

if (parseInt(parametroURL.get("page")) == 1 || parametroURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parseInt(parametroURL.get("page"));
}

console.log("Estamos en la página: " + numPage);
/* Solicitar datos al servidor */

fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    arrayCatalogo = objeto;

    cargarCatalogo(numPage)
})

/* Definir cargar catálogo */
function cargarCatalogo(pagina) {
    /* Referencia de catálogo */
    let filaCatalogo = document.querySelector("#catalogo");

    /* Crear elementos */
    let inicio = (pagina - 1) * 8 ;
    let final;
    let tmpFinal = pagina * 8-1;
    if (arrayCatalogo.length < tmpFinal) {
        final = arrayCatalogo.length;
    }else {
        final = tmpFinal;
    }

    for (let index = inicio; index <= final; index++) {
        /* Proceso precios */
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer* 100;
        let precioFinal = precio - (precio * oferta/100);

        /* Creo artículos */
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class",'class="col-xs-12 col-sm-6 col-md-4 col-xl-3" ');
        nuevoElemento.innerHTML = `
        <picture>
            <img class = "img-fluid " src = "image/productos/${arrayCatalogo[index].image}"  alt= "${arrayCatalogo[index].name}">
        </picture>

        <h4>${arrayCatalogo[index].name} </h4>
        <p>
            <span class="precioOriginal">S/ ${precio}</span> 
            <span class="precioDescuento">-${oferta}%</span>
            <br><span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick= "agregarCarrito(event)" class="btn btn-primary"><i class="bi bi-plus-square"></i> Agregar al carrito</button>

        `;
        /* Añadir nuevo elemento a catálogo */
        filaCatalogo.append(nuevoElemento);
    }
}


/* Método para agregar el producto al carrito */
function agregarCarrito(event){
    /* obtuve los datos de mi producto */

    let botones = event.target;
    let producto = botones.closest("article");
    let nombre = producto.querySelector("h4").innerText;
    let precio = producto.querySelector('.precioFinal').innerText;
    let imagenSrc = producto.querySelector('img').getAttribute('src');

    let nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <p>${nombre}</p>
      <img src="${imagenSrc}" alt="${nombre}">
      <p>${precio}</p>
    `;

    let carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.appendChild(nuevoElemento);
    carritoModal.show();
    
}

