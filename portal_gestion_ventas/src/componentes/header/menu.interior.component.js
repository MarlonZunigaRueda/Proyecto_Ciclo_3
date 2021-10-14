import React from 'react';
import '../css/Menu.css';
import logo from '../images/imagen1.png';

class MenuInterior extends React.Component{

	constructor(props, context) {
		super(props, context);
		
		this.handleClick = this.handleClick.bind(this);
  	}

	handleClick(){
		console.log("algo");
		
  	}

    render(){
        return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<img src={logo} className="menu-img" />
			<a className="navbar-brand">Gestión de ventas</a>
		    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		     	<span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse menu-submenu" id="navbarCollapse">
			    <ul className="navbar-nav mr-auto nav">
			        <li className="nav-item active">
			          	<a className="nav-link" href="#">Gestionar ventas</a>
						<ul>
							<li>
								<a href="../html/registrar_venta.html">
									Registrar venta
								</a>
							</li>
							<li>
								<a href="../html/consultar_ventas.html">
									Consultar ventas
								</a>
							</li>
                    	</ul>
			        </li>
			        <li className="nav-item">
			          	<a className="nav-link" href="#">Gestionar productos</a>
						<ul>
							<li>
								<a href="../html/registrar_producto.html">Registrar producto</a>
							</li>
							<li>
								<a href="../html/consultar_productos.html">
									Consultar productos
								</a>
							</li>
                    	</ul>
			        </li>
			        <li className="nav-item">
			          	<a className="nav-link" href="#">Gestionar usuarios</a>
						<ul>
							<li>
								<a href="../html/lista_usuarios.html">Mostrar usuarios</a>
							</li>
							<li>
								<a href="../html/crud_usuarios.html">Administrar usuarios</a>
							</li>
                    	</ul>
			        </li>
			        <li className="nav-item">
			          	<a className="nav-link" href="#">Contacto</a>
			        </li>
			    </ul>
		    </div>
			<div className="collapse navbar-collapse" id="navbarCollapse">
				<form className="form-inline mt-2 mt-md-0">
			        <button className="menu-button my-sm-0" type="submit" onClick={this.handleClick} >Cerrar sesión</button>
			    </form>
			</div>
		</nav>
        )
    }
}
export default MenuInterior;