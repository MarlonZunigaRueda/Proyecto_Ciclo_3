import React from 'react';
import SaleDataService from '../../services/gestor_ventas/sale.service';
import { Form, Button, Row, Col } from 'react-bootstrap'


class RegistrarVenta extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      sale: {
        status: {
          name: "",
          value: "",
        },
        registeredBy: {
          nameEmployee: "",
          idEmployee: "",
        },
        boughtBy: {
          nameClient: "",
          idClient: ""
        },
        productsBox: [],
        total: 0
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
    if (event.target.name === "status") {
      saleNew[event.target.name] = { name: val, value: val };
    } else {
      saleNew[event.target.name] = val;
    }
    this.setState({
      sale: saleNew
    });
  };

  createSale = event => {
    debugger;
    let sale = this.state.sale;
    SaleDataService.create(sale)
      .then(response => {
        this.setState({
          status: response.sale.status,
          registeredBy: response.sale.registeredBy,
          boughtBy: response.sale.boughtBy,
          productsBox: [],
          total: response.sale.total,

          submitted: true
        });
        console.log(response.sale);
      })
      .catch(e => {
        console.log(e);
      }); debugger;
    //event.preventDefault();
  };
  newSale() {
    this.setState({
      status: {
        name: "",
        value: "",
      },
      registeredBy: {
        nameEmployee: "",
        idEmployee: "",
      },
      boughtBy: {
        nameClient: "",
        idClient: ""
      },
      productsBox: [],
      total: 0
    });
  }

  render() {
    return (

      <>
        <section>
          <div>
            <h3>
              Ingrese los datos de la venta
            </h3>
          </div>
        </section>
        <Form onSubmit={this.createSale}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridID">
              <Form.Label>ID del producto</Form.Label>
              <Form.Control
                id="productsBox"
                name="productsBox"
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

            <Form.Group as={Col} controlId="formGridCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad"
                id="amount"
                name="amount"
                type="text"
              />
            </Form.Group>
          </Row>

          <div class="text-center">

            <Button type="submit" value="RegistrarVenta" variant="outline-danger">Registrar</Button>

          </div>

        </Form>
      </>
    )
  }
}
export default RegistrarVenta;