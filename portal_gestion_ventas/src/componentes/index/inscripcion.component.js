import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthDataService from '../../services/gestor_autenticacion/auth.service';

const required = value => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
        );
    }
};

const vemail = value => {
    if (!isEmail(value)) {
        return (
        <div className="alert alert-danger" role="alert">
            This is not a valid email.
        </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 10) {
        return (
        <div className="alert alert-danger" role="alert">
            The password must be between 6 and 10 characters.
        </div>
        );
    }
};
export default class Inscripcion extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullname: "",
                state: "02",
                role: "",
                email: "",
                password: ""
            },
            successful: false,
            message: ""
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.newUser = this.newUser.bind(this);
    }

    handleFormChange = event => {
        debugger;
        let userNew = {
            ...this.state.user
        };

        userNew[event.target.name] = event.target.value;

        this.setState({
            user: userNew
        });
    };

    createUser = event => {
        debugger;
        event.preventDefault();

        this.setState({
            message: "",
            successful: false
            });

        this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

        AuthDataService.register(this.state.user)
            .then(response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
                console.log("<------register-------->");
                console.log(response.data);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
                this.newUser();
            })
            .catch(e => {
                console.log(e);
            });
        }
    };

    newUser() {
        this.setState({
            name: "",
            state: {
                name: "",
                value: ""
            },
            description: "",
            role: "",
            email: "",
            password: "",

            submitted: false
        });
    }

    render(){
        return (
            <div className="auth-inner">
                <Form onSubmit = {this.state.successful ? this.newUser:this.createUser}
                    ref = {c => {this.form = c;}} >
                    {!this.state.successful && (
                        <div>
                        <h3>Registre sus datos</h3>
                        <div className="form-group">
                            <label>Nombre completo:</label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su nombre"
                                value={this.state.user.fullname}
                                onChange={this.handleFormChange}
                                validations={[required]}
                                />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Correo electrónico:</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Ingrese su corrreo"
                                value={this.state.user.email}
                                onChange={this.handleFormChange}
                                validations={[required, vemail]}
                                />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Ingrese su contraseña"
                                value={this.state.user.password}
                                onChange={this.handleFormChange}
                                validations={[required, vpassword]}
                                />
                        </div>
                        <p/>
                        <div className="form-group">
                            <label>Rol:</label>
                            <Select
                                id="role"
                                name="role"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su rol"
                                value={this.state.user.role}
                                onChange={this.handleFormChange}
                                validations={[required]}
                                >
                                <option value = "" ></option>
                                <option value = "01" > ADMINISTRADOR </option>
                                <option value = "02" > VENDEDOR </option>
                                <option value = "03" > CLIENTE </option>
                            </Select>
                        </div>
                        <br/>
                        <div className="sign-in">
                            <button type="submit" value="Inscripcion" >Registrar datos</button>
                        </div>
                    </div>
                    )} {this.state.message && (
                        <div className = "form-group" >
                            <div
                            className={
                                this.state.successful
                                ? "form-group alert alert-success"
                                : "form-group alert alert-danger"
                            }
                            role="alert"
                            >
                            {this.state.message}
                            <div className="sign-in">
                            <br/>
                            <button
                                type="submit" value="Inscripcion"
                                style={this.state.successful ? { display: "block" } : { display: "none" }}
                            >Inscribir usuario</button>
                            </div>
                            </div>
                        </div>)}
                    <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c;}} />
                </Form>
            </div>
        )
    }
}