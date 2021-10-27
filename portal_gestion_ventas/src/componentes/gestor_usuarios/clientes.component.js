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

class Clientes extends Component{

    constructor(props, context) {
		super(props, context);

		this.state = {
			successful: false,
            message: '',
			client: {
				id: '',
				fullname: '',
				email: '',
				state: ''
			},
			clients: []
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.newClient = this.newClient.bind(this);

    }

	handleFormChange = event => {

        let clientNew = {
            ...this.state.client
        };

        clientNew[event.target.name] = event.target.value;

        this.setState({
            client: clientNew
        });
    };

	componentDidMount() {
		this.fetchClients();
	}

	fetchClients() { debugger;
		UserDataService.getAllClients()
			.then(response =>{
				this.setState({
					clients: response.data.users,
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

	retrieveClient = id => {debugger;
        UserDataService.get(id)
		.then(response =>{
			this.setState({
				client: this.newClient(response.data.user),
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

	updateClient = (event) => {debugger;
		event.preventDefault();

		this.form.validateAll();
			if (this.checkBtn.context._errors.length === 0) {
			var client = this.state.client;

			var data = {
				fullname: client.fullname,
				email: client.email,
				state: client.state,
				role: client.role
			};

			UserDataService.update(client.id, data)
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

	newClient(data) {

		var client ;

		if (data) {
			client = {
					id: data.id,
					fullname: data.fullname,
					email: data.email,
					state: data.state.value,
					role: data.role.value
			}
		}else{

			client = {
				id: '',
				fullname: '',
				email: '',
				state: ''
			}

		}
		return client
	}

    render(){
        return (
			<div className="form-manager">
				<div>
					<h3> Clientes </h3>
				</div>
				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<Form
										onSubmit={this.updateClient}
										ref = {c => {this.form = c;}}>
									<div className="row">
										<div className="form-group">
											<label>ID:</label>
											<Input
											name="id"
											onChange={this.handleFormChange}
											value={this.state.client.id}
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
											value={this.state.client.fullname}
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
											value={this.state.client.email}
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
											<label>Estado:</label>
											<Select
											name="state"
											onChange={this.handleFormChange}
											value={this.state.client.state}
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
									<th>Estado</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								{
									this.state.clients.map(client => {
									return (
										<tr key={client.i}>
										<td>{client.fullname}</td>
										<td>{client.email}</td>
										<td>{client.state.name}</td>
										<td>
											<button onClick={() => this.retrieveClient(client.id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
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
export default Clientes;