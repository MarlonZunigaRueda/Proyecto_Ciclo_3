import React from 'react';

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
			 <h3>Bienvenido</h3>
        )
    }
}
export default Bienvenido;