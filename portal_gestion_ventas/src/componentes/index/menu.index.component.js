import React from 'react';
import '../css/Menu.css';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import logo from '../images/imagen1.png';

class MenuIndex extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <img src={logo} className="menu-img" alt="logo"/>
                <Link className="navbar-brand" to={"/sign-in"}>Gestión de ventas</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse menu-submenu" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sign-in"}>Iniciar sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>Inscribirse</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/contact"}>Contacto</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            )
    }
}
export default MenuIndex;