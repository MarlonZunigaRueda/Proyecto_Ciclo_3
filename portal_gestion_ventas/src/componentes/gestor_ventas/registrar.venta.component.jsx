import React from 'react';
import saleDataService from '../../services/gestor_venta/sale.service';
import { Form, Button, Row, Col} from 'react-bootstrap'


class RegistrarVenta extends React.Component{

    constructor(props, context) {
		super(props, context);
		
		this.handleClick = this.handleClick.bind(this);
    this.state = {
      sale: {
          cliente: "",
          valor: "",
          cantidad: "",
          vendedor: "",
          fecha: ""
      }
  	}
    this.handleFormChange = this.handleFormChange.bind(this);
  };

  handleFormChange = event => {
    debugger;
    let saleNew = {
        ...this.state.sale
    };
    let val = event.target.value;
    if (event.target.name === "role") {
        saleNew[event.target.name] = {name: val, value : val};
    }else{
        saleNew[event.target.name] = val;
    }
    this.setState({
        sale: userNew
    });
};

createSale = event => {
    let sale = this.state.sale;
    saleDataService.create(sale)
        .then(response => {
            this.setState({
                id_venta: response.sale.id,
                status: response.sale.status,
                description: response.sale.description,
                role: response.sale.role,
                email: response.sale.email,
                password: response.sale.password,

                submitted: true
            });
            console.log(response.sale);
        })
        .catch(e => {
            console.log(e);
        });debugger;
        //event.preventDefault();
};
newSale() {
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

            <>
            <section>
               <div>
                   <h3>
                       Ingrese los datos de la venta
                   </h3>
               </div>
            </section>
            <Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridID">
      <Form.Label>ID del producto</Form.Label>
      <Form.Control 
       id="selectedItem"
       name="selectedItem"
       type="text"
       className="form-control"
       placeholder="Id del producto"
       onChange={this.handleFormChange} />


    </Form.Group>

    <Form.Group as={Col} controlId="formGridDescripcion">
      <Form.Label>ID cliente</Form.Label>
      <Form.Control 
      type="text"
       placeholder="Id cliente" 
       id="boughtBy"
       name="boughtBy"
       type="text"
       />
    </Form.Group>
  </Row>


  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridNumber">
      <Form.Label>Valor Unitario</Form.Label>
      <Form.Control 
      type="number"
      placeholder="valor" 
      id="boughtBy"
      name="boughtBy"
      type="text"
      />
      
    </Form.Group>


    <Form.Group as={Col} controlId="formGridCantidad">
      <Form.Label>Cantidad</Form.Label>
      <Form.Control
      type="number"
      placeholder="Cantidad" 
      id="boughtBy"
      name="boughtBy"
      type="text"
      />
    </Form.Group>
  </Row>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridIDvendedor">
      <Form.Label>ID vendedor</Form.Label>
      <Form.Control
      type="number"
      placeholder="Id vendedor" 
      id="boughtBy"
      name="boughtBy"
      type="text"
      />
    </Form.Group>

   

    <Form.Group as={Col} controlId="formGridFecha">
      <Form.Label>Fecha</Form.Label>
      <Form.Control />
    </Form.Group>
  </Row>

  

  

 <div class="text-center">

  <Button href="/search_sale" variant="outline-danger">Registrar</Button> 
  
</div> 

</Form>
            
            
            
            </>
        )
    }
}
export default RegistrarVenta;