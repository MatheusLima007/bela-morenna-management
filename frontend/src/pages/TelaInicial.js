import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
//import { ImExit } from 'react-icons/im'

import '../styles/pages/home.css'
import logo from '../assets/logo.svg'

function TelaInicial() {
  const history = useHistory()
  function fazerLogout(e){
    e.preventDefault()

    localStorage.removeItem('token');
    history.push('/')
  }

  return ( 
    <div className="container">
      <img src={logo} alt="Bela Morenna"/>

        <div className="content">
          <p>
            <strong>Loja Bela Morenna</strong>
          </p>
          <div className="option">
            <Link to={'/tamanhos'} className="h1">
              Tamanhos
            </Link>

            <Link to={'/tamanhos'} >
            <FiArrowRight size={20} color="#000" className="svg" />
            </Link>
          </div>
          <div className="option">
            <Link to={'/tipo-pagamentos'} className="h1">
              Tipo de Pagamentos
            </Link>

            <Link to={'/tipo-pagamentos'}>
              <FiArrowRight size={20} color="#000" className="svg" />
            </Link>
          </div>
          <div className="option">
            <Link to={'/enderecos'} className="h1">
              Endereços
            </Link>
            
            <Link to={'/enderecos'} >
              <FiArrowRight size={20} color="#000" className="svg"/>
            </Link>
          </div>
          {/* <h1>
            <Link to={'/pagamentos'} className="h1">
              
              Pagamentos
              <FiPlus size={20} color="#000" />
            </Link>
          </h1> */}
          <div className="div-button">
            <button onClick={fazerLogout} className="btn">
              logout
            </button>
            {/* <ImExit size={18} color="#000" className="svg" /> */}
          </div>
        </div>
       
    </div>
  );
}

export default TelaInicial;
