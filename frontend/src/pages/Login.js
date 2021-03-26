import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
//import { FiPlus } from 'react-icons/fi'

import '../styles/pages/login.css'
import logo from '../assets/logo.svg'

import api from "../api"

function TelaInicial() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(event){
    event.preventDefault()
    const data = {
      email,
      senha
    }

    try {
        await api.post('signin', data)
          .then(res=>{
            localStorage.setItem('token', JSON.stringify(res.data.token))
          })
    } catch (error) {
        alert(error.response.data) 
        return
    }
    alert(`Login realizado com sucesso!`)
    history.push('/home')
  }

  return ( 
    <div id="page-cadastro" className="container">
      <img src={logo} alt="Bela Morenna"/>

      <div className="content">
        <p>
          <strong>Loja Bela Morenna</strong>
        </p>
        <form onSubmit={fazerLogin} >
          <label htmlFor="email">E-Mail </label>
          <input 
            id="email"  
            type="email"
            placeholder="Digite seu email"
            value={email} 
            onChange={event=>setEmail(event.target.value)} 
          />
          <label htmlFor="senha" id="senha">Senha: </label>
          <input 
            id="senha"  
            type="password"
            placeholder="Digite sua senha"
            value={senha} 
            onChange={event=>setSenha(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default TelaInicial;
