import React from 'react';
import { Redirect } from "react-router-dom";
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

    handleFormChange = event => { debugger;
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew
        });
    };

    login = event => { debugger;
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
        debugger;
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
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
                <p/>
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
                <p/>
                <div className="sign-in">
                    <button type="submit" value="Inicio" >Iniciar sesión</button>
                </div>
                <p>email_user === "admin@gmail.com" && psd_user === "123"</p>
            </form>
        )
    }
}
export default Inicio;