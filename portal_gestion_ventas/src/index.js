import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from './componentes/header/Menu';
import Inicio from './componentes/index/Inicio';
import Piepagina from './componentes/footer/Piepagina';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <div>
      <Menu/>
      <main></main>
      <Piepagina></Piepagina>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

