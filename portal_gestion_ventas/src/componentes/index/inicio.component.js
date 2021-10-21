import React from 'react';
import { Redirect} from "react-router-dom";
import { Form, Button, Row, Col} from 'react-bootstrap'
import GoogleLogin from 'react-google-login';
import UserDataService from '../../services/gestor_usuarios/user.service';

class Inicio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            islogged: false,
            loginParams: {
                email_user: "",
                psd_user: ""
            }
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

     responseGoogle (resp) {
        console.log(resp)
        console.log('Aquí entró google')
      };

    handleFormChange = event => {
        debugger;
        let loginParamsNew = {
            ...this.state.loginParams
        };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew
        });
    };

    login = event => {
        debugger;
        let email_user = this.state.loginParams.email_user;
        let psd_user = this.state.loginParams.psd_user;
        if (email_user === "admin@gmail.com" && psd_user === "123") {
            localStorage.setItem("token", "T");
            this.setState({
                islogged: true
            });
        }
        event.preventDefault();
    };

    render(){

        if (localStorage.getItem("token")) {
            return <Redirect to = "/" / > ;
        }

        return (
          <form onSubmit={this.login}>
            <h3>Inicie sesión</h3>

            <div className="form-group">
              <label>Correo electrónico:</label>
              <input
                id="email_user"
                name="email_user"
                type="email"
                className="form-control"
                placeholder="Ingrese su corrreo"
                onChange={this.handleFormChange}
              />
            </div>
            <p />
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                id="psd_user"
                name="psd_user"
                type="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                onChange={this.handleFormChange}
              />
            </div>
            <p />

            <div className="sign-in">
              <button type="submit" value="Inicio">
                Iniciar sesión
              </button>
            </div>
            <p />
            <div class="text-center">
              <h6>O inicie sesión con</h6>
            </div>
            <p />
            <div className="text-center">
              <GoogleLogin
                clientId="555580086588-h1b8s5bst3f3vmh6ore3l6ddn222ge59.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <p />
              <p>email_user === "admin@gmail.com" && psd_user === "123"</p>
            </div>
          </form>
        );
    }
}
export default Inicio;