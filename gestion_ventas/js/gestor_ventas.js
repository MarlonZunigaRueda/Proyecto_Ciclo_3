
function cargue() {
    creartabla();
}

window.onload = cargue;

const iniciarsesion = () => {
    user = document.getElementById("user");
    psd = document.getElementById("psd");

    if (validarDato(user) && validarDato(psd) && validarUsuario(user)) {
        console.log("Tiene datos");
        window.location.href = '../html/bienvenida.html';
    } else {
        window.alert("Las credenciales no son válidas, intente de nuevo.");
    }
}

const cerrarsesion = () => {
    window.location.href = '../index.html';

}

const consultarventas = () => {

    fecha_inicial = document.getElementById("fecha_inicial");
    fecha_final = document.getElementById("fecha_final");
    cod_venta = document.getElementById("cod_venta");
    cod_cliente = document.getElementById("cod_cliente");
    nombre_cliente = document.getElementById("nombre_cliente");

    if (validarDato(fecha_inicial) || validarDato(fecha_final) || validarDato(cod_venta) || validarDato(cod_cliente) || validarDato(nombre_cliente)) {
        creartabla();

    } else {
        window.alert("Los datos no son válidos, intente de nuevo.");
    }
}

const creartabla = () => {
    var myobj = document.getElementById('tbventas');

    if (validarObj(myobj)) {
        myobj.remove();
    }


    let table = document.createElement('table');
    table.setAttribute("id", "tbventas");
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('tabla').appendChild(table);

    for (let i = 0; i < 11; i++) {

        let row = document.createElement('tr');

        for (let j = 0; j < 8; j++) {

            var elementohtml = i == 0 ? 'th' : 'td';
            let elemento = document.createElement(elementohtml);
            var contenido = i == 0 ? crearencabezadotabla(j) : creardataventastabla(j, i);
            elemento.innerHTML = contenido;
            row.appendChild(elemento);
        }
        if (i == 0) {
            thead.appendChild(row);
        } else {
            tbody.appendChild(row);
        }

    }
    return myobj;
}

const crearencabezadotabla = (dato) => {
    var encabezado = "";
    switch (dato) {
        case 0:
            encabezado = "Código de venta";
            break;
        case 1:
            encabezado = "Descripción";
            break;
        case 2:
            encabezado = "Cantidad";
            break;
        case 3:
            encabezado = "Valor unidad";
            break;
        case 4:
            encabezado = "Total";
            break;
        case 5:
            encabezado = "Nombre del vendedor";
            break;
        case 6:
            encabezado = "Identificación del cliente";
            break;
        case 7:
            encabezado = "Nombre del cliente";
            break;
        default:
            break;
    }
    return encabezado;
}

const creardataventastabla = (dato1, dato2) => {
    var info = "";
    switch (dato1) {
        case 0:
            info = "" + (dato2);
            break;
        case 1:
            info = "Produto " + (dato2);
            break;
        case 2:
            info = Math.floor(Math.random() * (5 - 1) + 1);
            break;
        case 3:
            info = "$" + Math.floor(Math.random() * (50000 - 10000) + 10000);
            break;
        case 4:
            info = "$" + Math.floor(Math.random() * (50000 - 10000) + 10000);
            break;
        case 5:
            info = "Vendedor " + Math.floor(Math.random() * (5 - 1) + 1);
            break;
        case 6:
            info = "Cliente " + Math.floor(Math.random() * (50 - 10) + 1);
            break;
        case 7:
            info = "Cliente " + Math.floor(Math.random() * (5 - 1) + 1);
            break;
        default:
            break;
    }
    return info;
}

function validarDato(dato) {

    return (dato !== undefined && dato !== null && dato.value !== undefined && dato.value !== null && dato.value !== "")

}

function validarObj(dato) {

    return (dato !== undefined && dato !== null && dato !== "")

}

function validarUsuario(dato) {

    var validacion = false;
    switch (dato.value) {
        case 'leydy':
            validacion = true;
            break;
        case 'mateo':
            validacion = true;
            break;
        case 'marlon':
            validacion = true;
            break;
        case 'leonardo':
            validacion = true;
            break;
        case 'carlos':
            validacion = true;
            break;
        default:
            break;
    }
    return validacion;
}