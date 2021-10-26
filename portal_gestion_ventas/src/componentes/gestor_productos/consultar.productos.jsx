import React from 'react';
import ProductDataService from '../../services/gestor_productos/product.services'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


const required = value => {
  if (!value) {
      return (
      <div className="alert alert-danger" role="alert">
          This field is required!
      </div>
      );
  }
};




class ConsultarProducto extends React.Component{

  

    constructor(props, context) {
		super(props, context);

    this.state={
      successful:false,
      message:'',
      product:{
        id:'',
        description:'',
        unit_value: 0,
        state:'',
        amount:0
      },
      products:[]
    };
		this.handleFormChange = this.handleFormChange.bind(this);
    this.getState = this.getState.bind(this);
		
  	}

    handleFormChange = event => {debugger;
      let productNew = {
          ...this.state.product
      };
  var property = event.target;
  if (property.name === 'state') {
    productNew[event.target.name] = this.getState(property.value);
  }else{
        productNew[event.target.name] = event.target.value;
  }
      this.setState({
          product: productNew
      });
  };

  componentDidMount() {
		this.fetchProducts();
	}

	fetchProducts() { debugger;
		ProductDataService.getAll()
			.then(response =>{
				this.setState({
					products: response.data.products,
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

	retrieveProducts = id => {debugger;
        ProductDataService.get(id)
		.then(response =>{
			this.setState({
				employee: response.data.product,
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



	getState(value) {
		var state = {};
		switch (value) {
			case '01':
				state = {name:"DISPONIBLE",value: value};
				break;
			case '02':
				state = {name:"NO DISPONIBLE",value: value};
				break;
			default:
				break;
		}
		return state;
	}

	updateProduct = (event) => {debugger;
		event.preventDefault();

		this.form.validateAll();
			if (this.checkBtn.context._errors.length === 0) {
			var product = this.state.product;

			var data = {
				description: product.description,
				amount: product.amount,
				state: this.getState(product.state.value)
			};

			ProductDataService.update(product.id, data)
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

	newProduct() {
		this.setState({ 
      product:{
      id:'',
      description:'',
      unit_value: 0,
      state:'',
      amount:0
    },
			
		});
	}
	

    render(){
        return (
			 <>
            <div className="form-manager">
				<div>
					<h3> Productos </h3>
				</div>
				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<Form
										onSubmit={this.updateProduct}
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
											validations={[required]}
											disabled
											/>
										</div>
									</div>
									<br/>
									<div className="row">
										<div className="form-group">
											<label>Descripción:</label>
											<Input
											name="Descripción"
											onChange={this.handleFormChange}
											value={this.state.product.description}
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
											<label>Valor Unitario</label>
											<Input
											name="Valor"
											onChange={this.handleFormChange}
											value={this.state.product.description}
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
											<label>Cantidad:</label>
											<Input
											name="cantidad"
											onChange={this.handleFormChange}
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
											value={this.state.product.state.value}
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
									<th>Descripción</th>
									<th>Cantidad</th>
									<th>Valor Unitario</th>
									<th>Estado</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								{
									this.state.products.map(product => {
									return (
										<tr key={product.i}>
										<td>{product.description}</td>
										<td>{product.amount}</td>
										<td>{product.state.name}</td>
										<td>
											<button onClick={() => this.retrieveProducts(product.id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
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






             </>
        )
    }
}
export default ConsultarProducto;