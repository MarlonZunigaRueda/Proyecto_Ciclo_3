import React from 'react';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bienvenido from '../../componentes/welcome/bienvenido.component';
import MenuInterior from '../../componentes/header/menu.interior.component';
import Piepagina from '../../componentes/footer/piepagina.component';

function AppInterior() {
  return (<Router>
      <div className="App">
        <MenuInterior/>
        <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/welcome' component={Bienvenido} />
                <Route path="/welcome" component={Bienvenido} />
              </Switch>
            </div>
          </div>
        <Piepagina/>
      </div></Router>);
}

export default AppInterior;
