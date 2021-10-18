import React, { Component } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from '../images/imagen1.png';

import Bienvenido from '../../componentes/welcome/bienvenido.component';
import Ventas from '../../componentes/gestor_ventas/ventas.component';
import Productos from '../../componentes/gestor_productos/productos.component';
import Usuarios from '../../componentes/gestor_usuarios/usuarios.component';
import NotFound from "../../componentes/error/not.found.component";
import RegistrarProducto from '../gestor_productos/registrar.producto.component';
import ConsultarProducto from '../gestor_productos/consultar.productos';
import RegistrarVenta from '../gestor_ventas/registrar.venta.component';
import ConsultarVenta from '../gestor_ventas/consultar.productos';


class Interior extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/sign-in" />;
    }
    const { match } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <img src={logo} className="menu-img" alt="logo"/>
              <Link className="navbar-brand" to={`${match.path}/welcome`}>Gestión de ventas</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse menu-submenu" id="navbarCollapse">
              <ul className="navbar-nav mr-auto nav">
                  <li className="nav-item active">
                      <a className="nav-link" >Gestionar ventas</a>
                      <ul>
                        <li>
                          <Link className="nav-link" to={`${match.path}/register_sale`} >Registrar venta</Link>
                        </li>
                        <li>
                          <Link className="nav-link" to={`${match.path}/search_sale`} >Consultar ventas</Link>
                        </li>
                      </ul>
                  </li>
                  <li className="nav-item active">
                      <a className="nav-link" >Gestionar productos</a>
                      <ul>
                          <li>
                            <Link className="nav-link" to={`${match.path}/register_product`} >Registrar producto</Link>
                          </li>
                          <li>
                            <Link className="nav-link" to={`${match.path}/search_product`} >Consultar productos</Link>
                          </li>
                      </ul>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to={`${match.path}/manage_users`} >Gestionar usuarios</Link>
                  </li>
              </ul>
            </div>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <form className="form-inline mt-2 mt-md-0">
                  <button className="menu-button my-sm-0" type="submit" onClick={this.signOut} >Cerrar sesión</button>
              </form>
          </div>
        </nav>

        <main role="main">
          <div className="main">
            <Switch>
              <Route exact path={`${match.path}/`} component={Bienvenido} />
              <Route path={`${match.path}/welcome`} component={Bienvenido} />
              <Route path={`${match.path}/manage_sales`} component={Ventas} />
              <Route path={`${match.path}/register_sale`} component={RegistrarVenta} />
              <Route path={`${match.path}/search_sale`} component={ConsultarVenta} />
              <Route path={`${match.path}/manage_products`} component={Productos} />
              <Route path={`${match.path}/register_product`} component={RegistrarProducto} />
              <Route path={`${match.path}/search_product`} component={ConsultarProducto} />
              <Route path={`${match.path}/manage_users`} component={Usuarios} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
 
export default withRouter(Interior);
