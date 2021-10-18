import React from 'react';
import { Table } from 'react-bootstrap';



class ConsultarProducto extends React.Component{

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
             { <Table className='content-form' striped bordered hover>
  <thead>
    <tr>
      <th>Código</th>
      <th>Descripción</th>
      <th>Cantidad</th>
      <th>Valor Unitario</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table> }







             </>
        )
    }
}
export default ConsultarProducto;