import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import GoogleLogin from 'react-google-login';
import AuthDataService from '../../services/gestor_autenticacion/auth.service';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Este dato es requerido!
      </div>
    );
  }
};
class Inicio extends Component{

    constructor(props) {debugger;
      super(props);
      if (localStorage.getItem("user")) {
        localStorage.removeItem("token");
      }
      this.state = {
        successful: false,
        message: "",
        loginParams: {
          email_user: "",
          psd_user: "",
        }
      };

      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleForLogin = this.handleForLogin.bind(this);
      this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(resp) {
      console.log(resp)
      console.log('Aquí entró google')
    };

    handleFormChange = event => { debugger;
      let loginParamsNew = {
        ...this.state.loginParams
      };
      let val = event.target.value;
      loginParamsNew[event.target.name] = val;
      this.setState({
        loginParams: loginParamsNew
      });
    };

    handleForLogin = event => {

      event.preventDefault();

      this.setState({
        successful: true,
        message: ""
      });

      this.form.validateAll();

      let loginParams = this.state.loginParams;
      if (this.checkBtn.context._errors.length === 0) {
        AuthDataService.login(loginParams.email_user, loginParams.psd_user)
          .then(() => {

                this.props.history.push("/welcome");
                window.location.reload();

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
            })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.setState({
          successful: false
        });
      }
    };

    render(){
        return (
          <div className="auth-inner">
          <Form
                onSubmit = {this.handleForLogin}
                ref = {c => {this.form = c;}} >
            <h3>Inicie sesión</h3>

            <div className="form-group">
              <label>Correo electrónico:</label>
              <Input
                id="email_user"
                name="email_user"
                type="email"
                className="form-control"
                placeholder="Ingrese su corrreo"
                value={this.state.loginParams.email_user}
                onChange={this.handleFormChange}
                validations={[required]}
              />
            </div>
            <p />
            <div className="form-group">
              <label>Contraseña:</label>
              <Input
                id="psd_user"
                name="psd_user"
                type="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                value={this.state.loginParams.psd_user}
                onChange={this.handleFormChange}
                validations={[required]}
              />
            </div>
            <p />

            <div className="sign-in">
              <button

                disabled={this.state.successful}>
                {this.state.successful && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Iniciar sesión</span>
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
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          </div>
        );
    }
}
export default Inicio;