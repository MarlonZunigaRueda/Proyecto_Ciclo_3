import React from 'react';

class Inscripcion extends React.Component{
    render(){
        return (
			<form>
                <h3>Registre sus datos</h3>

                <div className="form-group">
                    <label>Nombre completo:</label>
                    <input type="text" className="form-control" placeholder="Ingrese su nombre" />
                </div>
                <p/>
                <div className="form-group">
                    <label>Correo electrónico:</label>
                    <input type="email" className="form-control" placeholder="Ingrese su corrreo" />
                </div>
                <p/>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" className="form-control" placeholder="Ingrese su contraseña" />
                </div>
                <p/>
                <div className="sign-in">
                    <button type="submit">Registrar datos</button>
                </div>
            </form>
        )
    }
}
export default Inscripcion;