import React from 'react';
import './Piepagina.css'

class Piepagina extends React.Component{
    render(){
        return (
		<footer >
			<div className="piepagina">
			<p> Misión TIC | Ciclo 3 Grupos 52,53,54 | Equipo 14 | Todos los derechos reservados &copy; {(new Date().getFullYear())}</p>
			</div>
            
        </footer>
        )
    }
}
export default Piepagina;