function cargue() {
    crearTabla();
    cargarDatosProducto();
}

window.onload = cargue;

const cerrarSesion = () => {
    window.location.href = '../index.html';

}
const consultarProductos = () => {

    cod_producto = document.getElementById("cod_producto");
    nbr_producto = document.getElementById("nbr_producto");


    if (validarDato(cod_producto) || validarDato(nbr_producto)) {
        crearTabla();

    } else {
        window.alert("Los datos no son válidos, intente de nuevo.");
    }
}

const crearTabla = () => {
    var myobj = document.getElementById('tbproductos');
    var divtabla = document.getElementById('tabla');

    if (validarObj(myobj)) {
        myobj.remove();
    }

    if (validarObj(divtabla)) {

        let table = document.createElement('table');
        table.setAttribute("id", "tbproductos");
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById('tabla').appendChild(table);

        for (let i = 0; i < 11; i++) {

            let row = document.createElement('tr');

            for (let j = 0; j < 6; j++) {

                var elementohtml = i == 0 ? 'th' : 'td';
                let elemento = document.createElement(elementohtml);
                var contenido = i == 0 ? crearEncabezadoTabla(j) : crearDataProductoTabla(j, i);
                if (i != 0 && j == 5) {
                    elemento.appendChild(contenido);
                } else {
                    elemento.innerHTML = contenido;
                }
                row.appendChild(elemento);
            }
            if (i == 0) {
                thead.appendChild(row);
            } else {
                tbody.appendChild(row);
            }

        }
    }
    return myobj;
}

const crearEncabezadoTabla = (dato) => {
    var encabezado = "";
    switch (dato) {
        case 0:
            encabezado = "Código de Producto";
            break;
        case 1:
            encabezado = "Descripción";
            break;
        case 2:
            encabezado = "Marca";
            break;
        case 3:
            encabezado = "Cantidad";
            break;
        case 4:
            encabezado = "Valor Unidad";
            break;
        case 5:
            encabezado = "Editar Producto";
            break;

    }
    return encabezado;
}

const crearDataProductoTabla = (dato1, dato2) => {
    var info = "";
    switch (dato1) {
        case 0:
            info = "" + (dato2);
            break;
        case 1:
            info = "Produto " + (dato2);
            break;
        case 2:
            info = "Genérico";
            break;
        case 3:
            info = Math.floor(Math.random() * (500 - 100) + 100);
            break;
        case 4:
            info = "$" + Math.floor(Math.random() * (50000 - 10000) + 10000);
            break;
        case 5:
            info = document.createElement('button');
            info.setAttribute("id", "btneditarventa" + dato2 + dato1);
            info.setAttribute("class", "boton");
            info.setAttribute("onclick", "crearProducto('editar_producto')");
            info.innerText = '';
            break;
        default:
    }
    return info;
}

const crearProducto = (o) => {
    switch (o) {
        case 'crear_producto':
            localStorage.setItem("operacion", o);
            window.location.href = '../html/registrar_producto.html';
            break;
        case 'editar_producto':
            localStorage.setItem("operacion", o);
            window.location.href = '../html/editar_producto.html';
            break;
        default:
            window.alert("Ha ocurrido un error, intente de nuevo.");
            break;
    }

}

const registrarProducto = () => {
    debugger;
    cod_producto = document.getElementById("cod_producto");
    dsc_producto = document.getElementById("dsc_producto");
    valor_producto = document.getElementById("valor_producto");
    cantidad_producto = document.getElementById("cantidad_producto");

    if (!!validarDato(cod_producto) && !!validarDato(dsc_producto) && !!validarDato(valor_producto) && !!validarDato(cantidad_producto)) {
        window.location.href = '../html/consultar_productos.html';
    } else {
        window.alert("Hay datos que no son válidos, intente de nuevo.");
    }
}

const cargarDatosProducto = () => {
    ope = localStorage.getItem("operacion");
    if (!!validarObj(ope) && ope == 'editar_producto') {
        localStorage.removeItem("operacion");
        var myobj = document.getElementById('cod_producto');
        myobj.value = "P-0123654479";
        myobj = document.getElementById('dsc_producto');
        myobj.value = "Nevera";
        myobj = document.getElementById('valor_producto');
        myobj.value = "50000000";
        myobj = document.getElementById('cantidad_producto');
        myobj.value = "510";
    }
}

function validarDato(dato) {
    return (!!validarObj(dato) && dato.value !== undefined && dato.value !== null && dato.value !== "")
}

function validarObj(dato) {
    return (dato !== undefined && dato !== null && dato !== "");
}

function validarNum(dato) {
    return (!!validarObj(dato) && !!Number.isInteger(dato));
}