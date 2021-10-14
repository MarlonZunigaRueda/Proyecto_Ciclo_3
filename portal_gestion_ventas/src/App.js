import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from './componentes/index/inicio.component';
import Inscripcion from './componentes/index/inscripcion.component';
import Contacto from './componentes/index/contacto.component';
import MenuIndex from './componentes/index/menu.index.component';
import Piepagina from './componentes/footer/piepagina.component';


function App() {
  return (<Router>
      <div className="App">
        <MenuIndex/>
        <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Inicio} />
                <Route path="/sign-in" component={Inicio} />
                <Route path="/sign-up" component={Inscripcion} />
                <Route path="/contact" component={Contacto} />
              </Switch>
            </div>
          </div>
        <Piepagina/>
      </div></Router>);
}

export default App;
