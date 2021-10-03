
function cargue() {
    creartabla();
}

window.onload = cargue;

const cerrarsesion = () => {
    window.location.href = '../index.html';

}

const lista_usuarios = () => {

    creartabla();

}

const creartabla = () => {
    var myobj = document.getElementById('tbusuarios');
    var divtabla = document.getElementById('tabla');

    if (validarObj(myobj)) {
        myobj.remove();
    } 
    
    if (validarObj(divtabla)) {


        let table = document.createElement('table');
        table.setAttribute("id", "tbusuarios");
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
                var contenido = i == 0 ? crearencabezadotabla(j) : creardatausuariostabla(j, i);
                elemento.innerHTML = contenido;
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

const crearencabezadotabla = (dato) => {
    var encabezado = "";
    switch (dato) {
        case 0:
            encabezado = "ID";
            break;
        case 1:
            encabezado = "Nombre";
            break;
        case 2:
            encabezado = "Apellido";
            break;
        case 3:
            encabezado = "Identificación";
            break;
        case 4:
            encabezado = "Rol";
            break;
        case 5:
            encabezado = "Estado";
            break;
        default:
            break;
    }
    return encabezado;
}

const creardatausuariostabla = (dato1, dato2) => {
    var info = "";
    switch (dato1) {
        case 0:
            info = "" + (dato2);
            break;
        case 1:
            info = "Nombre";
            break;
        case 2:
            info = "Apellido";
            break;
        case 3:
            info = Math.floor(Math.random() * (90000000 - 100000) + 10000);
            break;
        case 4:
            info = "Vendedor/Administrador";
            break;
        case 5:
            info = "Pendiente";
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