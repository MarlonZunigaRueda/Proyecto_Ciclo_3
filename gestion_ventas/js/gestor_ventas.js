
const iniciarsesion = () => {
    debugger;
    user = document.getElementById("user");
    psd = document.getElementById("psd");

    if (validarDato(user) && validarDato(psd) && validarUsuario(user)) {
        console.log("Tiene datos");
        window.location.href = '../html/bienvenida.html';
    }else{
        window.alert("Las credenciales no son válidas, intente de nuevo.");
    }
}

function validarDato(dato) {

    return (dato !== undefined && dato.value !== undefined & dato.value !== "")

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