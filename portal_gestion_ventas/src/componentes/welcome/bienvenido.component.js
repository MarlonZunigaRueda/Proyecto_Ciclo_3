import React from 'react';
import Welcome from '../../componentes/images/imagen4.jpg';

class Bienvenido extends React.Component{

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
			<div id="no-found" className="welcome">
            <img src={Welcome} alt="Welcome"/>
            <div id="info">
                <h3>Bienvenido a su espacio de trabajo.</h3>
            </div>
        </div >
        )
    }
}
export default Bienvenido;