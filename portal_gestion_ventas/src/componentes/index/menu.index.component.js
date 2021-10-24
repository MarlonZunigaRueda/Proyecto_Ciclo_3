import React, { Component } from "react";
import '../css/Menu.css';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import logo from '../images/imagen1.png';
import EventBus from "../../common/event.bus.common";

import AuthDataService from '../../services/gestor_autenticacion/auth.service';
import UserDataService from '../../services/gestor_usuarios/user.service';

class MenuIndex extends Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showSellerBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
            debugger;
            const user = AuthDataService.getCurrentUser();

            if (user) {
                UserDataService.getRole(user.role).then(response => {
                        this.setState({
                            currentUser: user,
                            showSellerBoard: response.data.role && response.data.role.value !=="03" ? true : false,
                            showAdminBoard: response.data.role && response.data.role.value !=="03"  ? true : false,
                            message: response.data.message,
                            successful: response.data.successful
                        });
                        console.log("<------register-------->");
                        console.log(response.data);
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            message: resMessage,
                            successful: false
                        });
                    }).catch(e => {
                        console.log(e);
                    });

                if (!this.state.role) {
                    this.setState({
                        successful: false
                    });
                }
    }

    EventBus.on("logout", () => {
        this.logOut();
    });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthDataService.logaccessTokenout();
        this.setState({
            showSellerBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }


    render(){
        const { currentUser, showSellerBoard, showAdminBoard } = this.state;
        return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <img src={logo} className="menu-img" alt="logo"/>
                <Link className="navbar-brand" to={"/"}>Gestión de ventas</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse menu-submenu" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto nav">
                        {(!currentUser || !showSellerBoard || !showAdminBoard) && (
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Iniciar sesión</Link>
                            </li>
                        )}
                        {(!currentUser || !showSellerBoard || !showAdminBoard) && (
                            <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>Inscribirse</Link>
                            </li>)
                        }
                        {currentUser && showSellerBoard && showAdminBoard && (
                        <li className="nav-item active">
                            <a href="#" className="nav-link" >Gestionar ventas</a>
                            <ul>
                                <li>
                                <Link className="nav-link" to={"manager/register_sale"} >Registrar venta</Link>
                                </li>
                                <li>
                                <Link className="nav-link" to={"manager/search_sale"} >Consultar ventas</Link>
                                </li>
                            </ul>
                        </li>)}
                        {currentUser && showSellerBoard && showAdminBoard && (
                            <li className="nav-item active">
                            <a className="nav-link" >Gestionar productos</a>
                            <ul>
                                <li>
                                    <Link className="nav-link" to={"manager/register_product"} >Registrar producto</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to={"manager/search_product"} >Consultar productos</Link>
                                </li>
                            </ul>
                        </li>)}
                        {currentUser && showSellerBoard && showAdminBoard && (
                            <li className="nav-item active">
                                <Link className="nav-link" to={"manager/manage_users"} >Gestionar usuarios</Link>
                            </li>)}
                        <li className="nav-item">
                            <Link className="nav-link" to={"/contact"}>Contacto</Link>
                        </li>
                    </ul>
                </div>
                {currentUser && showSellerBoard && showAdminBoard &&(
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <form className="form-inline mt-2 mt-md-0">
                        <button className="menu-button my-sm-0" type="submit" onClick={this.logOut} >Cerrar sesión</button>
                    </form>
                </div>
                )}
            </nav>
        </div>)
    }
}
export default MenuIndex;