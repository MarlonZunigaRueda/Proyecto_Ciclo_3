import React from 'react';

class Usuarios extends React.Component{

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
			 <h3>Usuarios</h3>
        )
    }
}
export default Usuarios;