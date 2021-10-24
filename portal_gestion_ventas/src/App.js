import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './componentes/css/Menu.css'
import Logo from './componentes/images/imagen1.png';

import AuthDataService from './services/gestor_autenticacion/auth.service';
import UserDataService from './services/gestor_usuarios/user.service';

import ProtectedRoute from "./componentes/welcome/protected.route.component";

import Inicio from './componentes/index/inicio.component';
import Inscripcion from './componentes/index/inscripcion.component';
import Contacto from './componentes/index/contacto.component';
import Ventas from './componentes/gestor_ventas/ventas.component';
import Productos from './componentes/gestor_productos/productos.component';
import Usuarios from './componentes/gestor_usuarios/usuarios.component';
import NotFound from "./componentes/error/not.found.component";
import RegistrarProducto from './componentes/gestor_productos/registrar.producto.component';
import ConsultarProducto from './componentes/gestor_productos/consultar.productos';
import RegistrarVenta from './componentes/gestor_ventas/registrar.venta.component';
import ConsultarVenta from './componentes/gestor_ventas/consultar.productos';

import Bienvenido from './componentes/welcome/bienvenido.component';

import Piepagina from './componentes/footer/piepagina.component';

import EventBus from "./common/event.bus.common";


class App extends Component {
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
            showSellerBoard: this.validateRoleSeller(response.data.role),
            showAdminBoard: this.validateRoleAdmin(response.data.role),
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

  validateRoleSeller(role) { debugger;
    return (role && role.value !== "03" && role.value === "02")? true : false
  }

  validateRoleAdmin(role) {
    return (role && role.value !== "03" && role.value === "01")? true : false
  }

  logOut() {
    AuthDataService.logout();
    this.setState({
      showSellerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render(){
    const { currentUser, showSellerBoard, showAdminBoard } = this.state;
    return(<Router>
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <img src={Logo} className="menu-img" alt="logo"/>
        <Link to={"#"} className="navbar-brand">
          Gestión de ventas
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse menu-submenu" id="navbarCollapse">
          <ul className="navbar-nav mr-auto nav">
            {currentUser  && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/welcome"} className="nav-link">
                    {`¡Hola ${currentUser.fullname}!`}
                  </Link>
                </li>
              </div>
            )}
            {showSellerBoard && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" >Gestionar ventas</a>
                  <ul>
                    <li>
                      <Link className="nav-link" to={"/register_sale"} >Registrar venta</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to={"/search_sale"} >Consultar ventas</Link>
                    </li>
                  </ul>
                </li>
              </div>
            )}

            {showAdminBoard && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" >Gestionar productos</a>
                <ul>
                  <li>
                    <Link className="nav-link" to={"/register_product"} >Registrar producto</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to={"/search_product"} >Consultar productos</Link>
                  </li>
                </ul>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={"/manage_users"} >Gestionar usuarios</Link>
                </li>
            </div>)}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Cerrar sesión
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                  Iniciar sesión
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                  Inscribirse
                  </Link>
                </li>
              </div>
            )}
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to={"/contact"} className="nav-link">
                    Contacto
                  </Link>
                </li>
            </div>
          </ul>
        </div>
      </nav>
      <main className="main">
      <div className="container mt-3">
        <Switch>
          <Route path="/register" component={Inscripcion} />
          <Route path="/contact" component={Contacto} />
          <Route path="/manage_sales" component={Ventas} />
          <Route path="/register_sale" component={RegistrarVenta} />
          <Route path="/search_sale" component={ConsultarVenta} />
          <Route path="/manage_products" component={Productos} />
          <Route path="/register_product" component={RegistrarProducto} />
          <Route path="/search_product" component={ConsultarProducto} />
          <Route path="/manage_users" component={Usuarios} />
          <Route path="/welcome" component={Bienvenido} />
          <Route path={["/", "/login"]} component={Inicio} />
        </Switch>
      </div>
      </main>
      { /*<AuthVerify logOut={this.logOut}/> */ }
    </div>
    <Piepagina/>
    </Router>);
  }
}

export default App;
