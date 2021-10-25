import React, { Component } from "react";
import '../css/Tabla.css'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import UserDataService from '../../services/gestor_usuarios/user.service';

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

class Empleados extends Component{

    constructor(props, context) {
		super(props, context);

		this.state = {
			successful: false,
            message: '',
			employee: {
				id: '',
				fullname: '',
				email: '',
				state: '',
				role:  ''
			},
			employees: []
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.getState = this.getState.bind(this);
		this.getRole = this.getRole.bind(this);

    }

	handleFormChange = event => {debugger;
        let employeeNew = {
            ...this.state.employee
        };
		var property = event.target;
		if (property.name === 'state') {
			employeeNew[event.target.name] = this.getState(property.value);
		}else{
        	employeeNew[event.target.name] = event.target.value;
		}
        this.setState({
            employee: employeeNew
        });
    };

	componentDidMount() {
		this.fetchEmployees();
	}

	fetchEmployees() { debugger;
		UserDataService.getAllEmployees()
			.then(response =>{
				this.setState({
					employees: response.data.employees,
					message: response.data.message,
					successful: response.data.successful
				});
				//this.asignarRoles();

			} , error => {
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
            });

	}

	retrieveEmployee = id => {debugger;
        UserDataService.get(id)
		.then(response =>{
			this.setState({
				employee: response.data.user,
				message: response.data.message,
				successful: response.data.successful
			});

		} , error => {
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
		});
    };

	getRole(value) {
		var role = {};
		switch (value) {
			case '6170dc196a4177f4a4ae8faa':
				role = {name:"ADMINISTRADOR",value: "01"};
				break;
			case '6170dc196a4177f4a4ae8fab':
				role = {name:"VENDEDOR",value: "02"};
				break;
			default:
				break;
		}
		return role;
	}

	getState(value) {
		var state = {};
		switch (value) {
			case '01':
				state = {name:"ACTIVO",value: value};
				break;
			case '02':
				state = {name:"INACTIVO",value: value};
				break;
			default:
				break;
		}
		return state;
	}

	updateEmployee = (event) => {debugger;
		event.preventDefault();

		this.form.validateAll();
			if (this.checkBtn.context._errors.length === 0) {
			var employee = this.state.employee;

			var data = {
				fullname: employee.fullname,
				email: employee.email,
				state: this.getState(employee.state.value)
			};

			UserDataService.update(employee.id, data)
			.then((response) =>{
				this.setState({
					message: response.data.message,
					successful: response.data.successful
				});
			} , error => {
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
			}).then(()=>{
				window.location.reload();
			});
		}
    };

	newEmployee() {
		this.setState({
			employee: {
				id: '-----',
				fullname: '',
				email: '',
				state: '',
				role: ''
			}
		});
	}

    render(){
        return (
			<div className="form-manager">
				<div>
					<h3> Empleados </h3>
				</div>
				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<Form
										onSubmit={this.updateEmployee}
										ref = {c => {this.form = c;}}>
									<div className="row">
										<div className="form-group">
											<label>ID:</label>
											<Input
											name="id"
											onChange={this.handleFormChange}
											value={this.state.employee.id}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											disabled
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Nombre completo:</label>
											<Input
											name="fullname"
											onChange={this.handleFormChange}
											value={this.state.employee.fullname}
											type="text"
											className="form-control"
											validations={[required]}
											autoFocus
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Correo electrónico:</label>
											<Input
											name="email"
											onChange={this.handleFormChange}
											value={this.state.employee.email}
											type="email"
											className="form-control"
											autoFocus
											disabled
											validations={[required, vemail]}
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Role:</label>
											<Select
											name="role"
											onChange={this.handleFormChange}
											value={this.getRole(this.state.employee.role).value}
											type="text"
											className="form-control"
											autoFocus
											disabled
											validations={[required]}
											>
												<option value = "" ></option>
												<option value = "01" > ADMINISTRADOR </option>
												<option value = "02" > VENDEDOR </option>
											</Select>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Estado:</label>
											<Select
											name="state"
											onChange={this.handleFormChange}
											value={this.state.employee.state.value}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											>
												<option value = "" ></option>
												<option value = "01" > ACTIVO </option>
												<option value = "02" > INACTIVO </option>
											</Select>
										</div>
									</div>
									<br/>
									<div className="sign-in">
                            			<button type="submit" value="Inscripcion" >Guardar datos</button>
                        			</div>
									{(!this.state.successful && this.state.message) && (
										<div className="form-group">
                							<div className="alert alert-danger" role="alert">
												{this.state.message}
											</div>
										</div>
            						)}
									<CheckButton
										style={{ display: "none" }}
										ref={c => {this.checkBtn = c;}}
            						/>
									</Form>
								</div>
							</div>
						</div>
						<div className="col s7">
							<table>
								<thead>
								<tr>
									<th>Nombre completo</th>
									<th>Correo electrónico</th>
									<th>Rol</th>
									<th>Estado</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								{
									this.state.employees.map(employee => {
									return (
										<tr key={employee.i}>
										<td>{employee.fullname}</td>
										<td>{employee.email}</td>
										<td>{this.getRole(employee.role).name}</td>
										<td>{employee.state.name}</td>
										<td>
											<button onClick={() => this.retrieveEmployee(employee.id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
											<i className="material-icons">Editar</i>
											</button>
										</td>
										</tr>
									)
									})
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		)
    }
}
export default Empleados;