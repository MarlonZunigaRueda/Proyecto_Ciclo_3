import React, { Component } from "react";
import '../css/Tabla.css'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import UserDataService from '../../services/gestor_usuarios/user.service';
import AuthDataService from '../../services/gestor_autenticacion/auth.service';

const required = value => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            ¡Este campo es requerido!
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
		this.newEmployee = this.newEmployee.bind(this);

    }

	handleFormChange = event => {

		let employeeNew = {
			...this.state.employee
		};

		employeeNew[event.target.name] = event.target.value;

		this.setState({
			employee: employeeNew
		});
	};

	componentDidMount() {
		this.fetchEmployees();

		this.setState({
			userActived : AuthDataService.getCurrentUser()
		});
	}

	fetchEmployees() { debugger;
		UserDataService.getAllEmployees()
			.then(response =>{
				this.setState({
					employees: response.data.users,
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

	}

	retrieveEmployee = id => {debugger;
        UserDataService.get(id)
		.then(response =>{
			this.setState({
				employee: this.newEmployee(response.data.user),
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

	updateEmployee = (event) => {debugger;
		event.preventDefault();

		this.form.validateAll();
			if (this.checkBtn.context._errors.length === 0) {
			var employee = this.state.employee;

			var data = {
				fullname: employee.fullname,
				state: employee.state,
				role: employee.role
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

	newEmployee(data) {

		var employee ;

		if (data) {
			employee = {
					id: data.id,
					fullname: data.fullname,
					email: data.email,
					state: data.state.value,
					role: data.role.value
			}
		}else{

			employee = {
				id: '',
				fullname: '',
				email: '',
				state: '',
				role: ''
			}

		}
		return employee
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
											value={this.state.employee.role}
											type="text"
											className="form-control"
											autoFocus
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
											value={this.state.employee.state}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											>
												<option value = "" ></option>
												<option value = "01" > AUTORIZADO </option>
												<option value = "02" > PENDIENTE </option>
												<option value = "03" > NO AUTORIZADO </option>
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
										<tr key={employee.id}>
										<td>{employee.fullname}</td>
										<td>{employee.email}</td>
										<td>{employee.role.name}</td>
										<td>{employee.state.name}</td>
										<td>
											<button onClick={() => this.retrieveEmployee(employee.id)} disabled={employee.id === this.state.userActived.id} className="btn light-blue darken-4" style={{margin: '4px'}}>
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