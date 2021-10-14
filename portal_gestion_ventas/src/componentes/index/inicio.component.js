import React from 'react';
import Interior from '../../componentes/welcome/interior.component';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class Inicio extends React.Component{

    constructor(props, context) {
		super(props, context);
		
		this.handleClick = this.handleClick.bind(this);
  	}

	handleClick(){
        debugger;
		console.log("algo");
		var user = document.getElementById("email_user");
		var psd = document.getElementById("psd_user");

		if (user && psd) {
			return <Redirect to="/home" />
		} else {
			window.alert("Las credenciales no son válidas, intente de nuevo.");
		}
  	}

    render(){
        return (
			<form>
                <h3>Inicie sesión</h3>

                <div className="form-group">
                    <label>Correo electrónico:</label>
                    <input id="email_user" type="email" className="form-control" placeholder="Ingrese su corrreo" />
                </div>
                <p/>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input id="psd_user" type="password" className="form-control" placeholder="Ingrese su contraseña" />
                </div>
                <p/>
                <div className="sign-in">
                    <button type="submit" onClick={this.handleClick} >Iniciar sesión</button>
                </div>
            </form>
        )
    }
}
export default Inicio;