import React from 'react';
import ProductsDataService from '../../services/gestor_productos/product.services'
import { Form, Button, Row, Col} from 'react-bootstrap'


class RegistrarProducto extends React.Component{

    constructor(props, context) {
		super(props, context);

    this.state = {
      product: {
        description: String,
        status: {
          name: String,
          value: String
        },
        amount: Number,
        unitValue: Number,
        registeredBy: {
          nameEmployee: String,
          idEmployee: String
        }
      }
  };
		
	 this.handleFormChange = this.handleFormChange.bind(this);

  }

    handleFormChange = event => {
      debugger;
      let productNew = {
          ...this.state.product
      };
      let val = event.target.value;
      if (event.target.name === "role") {
          productNew[event.target.name] = {name: val, value : val};
      }else{
          productNew[event.target.name] = val;
      }
      this.setState({
          product: productNew
      });
  };

  createproduct = event => {
      let products = this.state.products;
      ProductsDataService.create(products)
          .then(response => {
              this.setState({
                  name: response.products.name,
                  status: response.products.status,
                  description: response.product.description,
                  role: response.product.role,
                  email: response.product.email,
                  password: response.product.password,

                  submitted: true
              });
              console.log(response.product);
          })
          .catch(e => {
              console.log(e);
          });debugger;
          //event.preventDefault();
  };
  newProduct() {
      this.setState({
        description: String,
        status: {
          name: String,
          value: String
        },
        amount: Number,
        unitValue: Number,
        registeredBy: {
          nameEmployee: String,
          idEmployee: String
        },

          submitted: false
      });
  }

    render(){
        return (

            <>
            <section>
               <div>
                   <h3>
                       Ingrese los datos del producto
                   </h3>
               </div>
            </section>
            <Form onSubmit={this.newProduct}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridID">
      <Form.Label>Estado del producto</Form.Label>
      <Form.Control 
       id= "status"
       name = "status"
       type="text"
       className="form-control"
       placeholder="Estado"
       onChange={this.handleFormChange}
        />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDescripcion">
      <Form.Label>Descripción</Form.Label>
      <Form.Control 
        id="name"
        name="name"
        type="text"
        className="form-control"
        onChange={this.handleFormChange}
        placeholder="Descripción" />
    </Form.Group>
  </Row>

  

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridNumber">
      <Form.Label>Valor Unitario</Form.Label>
      <Form.Control 
      id="unitValue"
      name="unitValue"
      type="number"
      className="form-control"
      onChange={this.handleFormChange}
      placeholder="Valor" />

    </Form.Group>

   

    <Form.Group as={Col} controlId="formGridCantidad">
      <Form.Label>Cantidad</Form.Label>
      <Form.Control
       id="amount"
       name="amount"
       type="number"
       className="form-control"
       onChange={this.handleFormChange}
       placeholder="Cantidad" />
      
    </Form.Group>
  </Row>

  

 <div class="text-center">

  <Button href="#" variant="outline-danger">Registrar</Button> 
  
</div> 

</Form>
            
            
            
            </>
        )
    }
}
export default RegistrarProducto;