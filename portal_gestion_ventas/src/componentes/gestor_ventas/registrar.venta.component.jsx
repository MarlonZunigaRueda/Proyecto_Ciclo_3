import React from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap'


class RegistrarVenta extends React.Component{

    constructor(props, context) {
		super(props, context);
		
		this.handleClick = this.handleClick.bind(this);
  	}

	handleClick(){
        debugger;
		console.log("algo");
		//this.props
		//console.log(this.refs.name);
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
      <Form.Control type="password" placeholder="Id producto" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDescripcion">
      <Form.Label>ID cliente</Form.Label>
      <Form.Control type="text" placeholder="Descripción" />
    </Form.Group>
  </Row>

  

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridNumber">
      <Form.Label>Valor Unitario</Form.Label>
      <Form.Control />
    </Form.Group>

   

    <Form.Group as={Col} controlId="formGridCantidad">
      <Form.Label>Cantidad</Form.Label>
      <Form.Control />
    </Form.Group>
  </Row>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridIDvendedor">
      <Form.Label>ID vendedor</Form.Label>
      <Form.Control />
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