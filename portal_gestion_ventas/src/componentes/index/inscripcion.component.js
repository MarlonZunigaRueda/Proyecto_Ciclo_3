import React from 'react';
import UserDataService from '../../services/gestor_usuarios/user.service';

class Inscripcion extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                status: {
                    name: "",
                    value: ""
                },
                role: {
                    name: "",
                    value: ""
                },
                email: "",
                password: ""
            }
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange = event => {
        debugger;
        let userNew = {
            ...this.state.user
        };
        let val = event.target.value;
        if (event.target.name === "role") {
            userNew[event.target.name] = {name: val, value : val};
        }else{
            userNew[event.target.name] = val;
        }
        this.setState({
            user: userNew
        });
    };

    createUser = event => {
        let user = this.state.user;
        UserDataService.create(user)
            .then(response => {
                this.setState({
                    name: response.user.name,
                    status: response.user.status,
                    description: response.user.description,
                    role: response.user.role,
                    email: response.user.email,
                    password: response.user.password,

                    submitted: true
                });
                console.log(response.user);
            })
            .catch(e => {
                console.log(e);
            });debugger;
            //event.preventDefault();
    };
    newUser() {
        this.setState({
            name: "",
            status: {
                name: "",
                value: ""
            },
            description: "",
            role: {
                name: "",
                value: ""
            },
            email: "",
            password: "",

            submitted: false
        });
    }

    render(){
        return (
            <div>
                {this.state.submitted ? (
                    <form onSubmit={this.newUser}>
                        <h4>¡El usuario se ha creado exitosamente!</h4>
                        <div className="sign-in">
                            <button type="submit" value="Inscripcion" >Nuevo usuario</button>
                        </div>
                    </form>
                ): (
                    <form onSubmit={this.createUser}>
                        <h3>Registre sus datos</h3>
                        <div className="form-group">
                            <label>Nombre completo:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su nombre"
                                onChange={this.handleFormChange} />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Correo electrónico:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Ingrese su corrreo"
                                onChange={this.handleFormChange} />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Ingrese su contraseña"
                                onChange={this.handleFormChange} />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Rol:</label>
                            <input
                                id="role"
                                name="role"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su rol"
                                onChange={this.handleFormChange}/>
                        </div>
                        <p/>
                        <div className="sign-in">
                            <button type="submit" value="Inscripcion" >Registrar datos</button>
                        </div>
                    </form>
        )}
            </div>
        )
    }
}
export default Inscripcion;