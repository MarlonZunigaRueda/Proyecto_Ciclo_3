import React, { Component } from "react";

class Contacto extends Component{
    render(){
        return (
        <div className="auth-inner">
			<form>
                <h3>Equipo 14</h3>

                <div className="form-group">
                    <label>Marlon Stiven Zuñiga Rueda </label>
                    <p className="contact-email">
                    Email: <a href="mailto: marlon1987123@gmail.com">marlon1987123@gmail.com</a>
                    </p>
                    <p/>
                </div>

                <div className="form-group">
                    <label>William Leonardo Potes </label>
                    <p className="contact-email">
                    Email: <a href="mailto: leonardo.potes@holmail.com">leonardo.potes@holmail.com</a>
                    </p>
                    <p/>
                </div>

                <div className="form-group">
                    <label>Mateo Soto Arango </label>
                    <p className="contact-email">
                    Email: <a href="mailto: mateo.sotoa@udea.edu.co">mateo.sotoa@udea.edu.co</a>
                    </p>
                    <p/>
                </div>

                <div className="form-group">
                    <label>Leydy Viviana Valencia </label>
                    <p className="contact-email">
                    Email: <a href="mailto: leidy.valencia77@gmail.com">leidy.valencia77@gmail.com</a>
                    </p>
                    <p/>
                </div>
                
            </form>
        </div>
        )
    }
}
export default Contacto;