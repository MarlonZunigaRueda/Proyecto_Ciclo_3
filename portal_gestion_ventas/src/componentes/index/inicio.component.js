import React from 'react';

class Inicio extends React.Component{
    render(){
        return (
			<form>
                <h3>Inicie sesión</h3>

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
                    <button type="submit">Iniciar sesión</button>
                </div>
            </form>
        )
    }
}
export default Inicio;