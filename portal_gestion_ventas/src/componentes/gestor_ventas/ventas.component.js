import React, { Component } from "react";
import '../css/Tabla.css'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import ProductDataService from '../../services/gestor_productos/product.services';
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

class Ventas extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			successful: false,
			message: '',
			product: {
				id: '',
				description: '',
				unitValue: 0,
				state: '',
				amount: 0
			},
			products: []
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.newProduct = this.newProduct.bind(this);

	}

	handleFormChange = event => {
		let productNew = {
			...this.state.product
		};

		productNew[event.target.name] = event.target.value;

		this.setState({
			product: productNew
		});
	};

	componentDidMount() {
		this.fetchProducts();
		this.setState({
			userActived : AuthDataService.getCurrentUser()
		});
	}

	fetchProducts() { debugger;
		ProductDataService.getAll()
			.then(response =>{
				this.setState({
					products: response.data.products,
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

	retrieveProduct = id => {debugger;


			ProductDataService.get(id)
				.then(response => {
					this.setState({
						product: this.newProduct(response.data.product),
						message: response.data.message,
						successful: response.data.successful
					});

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
				});

    };

	saveProduct = (event) => {
		debugger;
		event.preventDefault();

		this.form.validateAll();
		if (this.checkBtn.context._errors.length === 0) {

			var product = this.state.product;

			var data = {
				description: product.description,
				amount: product.amount,
				unitValue: product.unitValue,
				state: product.state,
				registeredBy: {
					nameEmployee: this.state.userActived.fullname,
					idEmployee: this.state.userActived.id
				}
			};

			if (product.id) {

				ProductDataService.update(product.id, data)
					.then((response) => {
						this.setState({
							message: response.data.message,
							successful: response.data.successful
						});
						window.location.reload();
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
					});
			}else {
				ProductDataService.create(data)
					.then((response) => {
						this.setState({
							message: response.data.message,
							successful: response.data.successful
						});
						window.location.reload();
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
					});
			}
		}
	};

	newProduct(data) {

		var product ;

		if (data) {
			product = {
				id: data.id,
				description: data.description,
				amount: data.amount,
				unitValue: data.unitValue,
				state: data.state.value,
				registeredBy: {
					nameEmployee: this.state.userActived.fullname,
					idEmployee: this.state.userActived.id
				}
			}
		}else{
			product = {
				id: '',
				description: '',
				unitValue: 0,
				state: '',
				amount: 0
			}

		}
		return product
	}

    render(){
        return (
            <div className="form-manager">
				<div>
					<h3> Ventas </h3>
				</div>
				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<Form
										onSubmit={this.saveProduct}
										ref = {c => {this.form = c;}}>
									<div className="row">
										<div className="form-group">
											<label>ID:</label>
											<Input
											name="id"
											onChange={this.handleFormChange}
											value={this.state.product.id}
											type="text"
											className="form-control"
											autoFocus
											disabled
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Lista de productos:</label>
											<Select
											name="state"
											onChange={this.handleFormChange}
											value={this.state.product.state}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											disabled={this.state.product.id}
											multiple={true}
											>
												<option value = "" ></option>
												<option value = "01" > DISPONIBLE </option>
												<option value = "02" > NO DISPONIBLE </option>
											</Select>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Cantidad de productos</label>
											<Input
											name="unitValue"
											onChange={this.handleFormChange}
											value={this.state.product.unitValue}
											type="number"
											className="form-control"
											autoFocus
											disabled
											validations={[required]}
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Total:</label>
											<Input
											name="amount"
											onChange={this.handleFormChange}
											value={this.state.product.amount}
											type="number"
											className="form-control"
											autoFocus
											disabled
											validations={[required]}
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
											value={this.state.product.state}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											>
												<option value = "" ></option>
												<option value = "01" > DISPONIBLE </option>
												<option value = "02" > NO DISPONIBLE </option>
											</Select>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Cliente:</label>
											<Select
											name="state"
											onChange={this.handleFormChange}
											value={this.state.product.state}
											type="text"
											className="form-control"
											autoFocus
											validations={[required]}
											disabled={this.state.product.id}
											>
												<option value = "" ></option>
												<option value = "01" > DISPONIBLE </option>
												<option value = "02" > NO DISPONIBLE </option>
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
									<th>Fecha de la venta</th>
									<th>Cantidad de productos</th>
									<th>Valor total</th>
									<th>Estado</th>
									<th>Cliente</th>
									<th>Vendedor</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								{
									this.state.products.map(product => {
									return (
										<tr key={product.id}>
										<td>{product.description}</td>
										<td>{product.amount}</td>
										<td>{product.unitValue}</td>
										<td>{product.state.name}</td>
										<td>{product.state.name}</td>
										<td>{product.state.name}</td>
										<td>
											<button onClick={() => this.retrieveProduct(product.id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
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
export default Ventas;