import React from 'react';
import ProductDataService from '../../services/gestor_productos/product.services'
import { Form, Button, Row, Col} from 'react-bootstrap'


class RegistrarProducto extends React.Component{

    constructor(props, context) {
		super(props, context);

    this.state = {
      product: {
        description: "",
        status: {
          name: "",
          value: ""
        },
        amount: 0,
        unitValue: 0,
        registeredBy: {
          nameEmployee: "",
          idEmployee: ""
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
      if (event.target.name === "status") {
          productNew[event.target.name] = {name: val, value : val};
      }else{
          productNew[event.target.name] = val;
      }
      this.setState({
          product: productNew
      });
  };

  createProduct = event => {
    debugger;
      let product = this.state.product;
      ProductDataService.create(product)
          .then(response => {
              this.setState({

                  status: response.product.status,
                  description: response.product.description,
                  amount: response.product.amount,
                  unitValue: response.product.unitValue,
                  registeredBy: {
                    nameEmployee: "Leo",
                    idEmployee: "2386"
                  },
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
        description: "",
        status: {
          name: "",
          value:""
        },
        amount: 0,
        unitValue: 0,
        registeredBy: {
          nameEmployee:"",
          idEmployee: ""
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
            <Form onSubmit={this.createProduct}>
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
        id="description"
        name="description"
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

  <Button type="submit" variant="outline-danger" value="RegistrarProducto">Registrar</Button> 
  
</div> 

</Form>
            
            
            
            </>
        )
    }
}
export default RegistrarProducto;