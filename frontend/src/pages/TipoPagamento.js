import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/formulario.css'
import api from "../api";

function TipoPagamento() {
  const history = useHistory()
  if(!localStorage.getItem('token')){
    history.push('/')
  }
  const [lista, setLista] = useState()
  const [descricao, setDescricao] = useState('')
  const [alteraId, setAlteraId] = useState('')
  const [alteraDescricao, setAlteraDescricao] = useState('')

  useEffect(()=>{
    api.get('tipo_pagamentos').then(response=>{
        setLista(response.data)
    })
  }, [lista])

  if(!lista) {
    return <p>Carregando...</p>
  }

  async function cadastrarTipoPagamento(event){
    event.preventDefault()

    try {
        await api.post('tipo_pagamentos', {descricao})
    } catch (error) {
        alert(error.response.data) 
        return
    }
    alert(`Cadastro de Tipo de Pagamento "${descricao}" realizado com sucesso!`)

    setDescricao('')
  }

  async function removerTipoPagamento(id){
    const removeId = id.toString()
    try {
        await api.delete(`tipo_pagamentos/${removeId}`)
    } catch (error) {
        alert(error.response.data)
        return
    }
    alert(`Tipo de Pagamento removido com sucesso!`)
  }

  async function alterarTipoPagamento(event){
    event.preventDefault()
    try {
        await api.put(`tipo_pagamentos/${alteraId}`, {descricao: alteraDescricao})
    } catch (error) {
        alert(error.response.data)
        return
    }

    setAlteraDescricao('')
    setAlteraId('')

    alert(`Tipo de Pagamento "${alteraDescricao}" alterado com sucesso!`)
  }

  return ( 
    <div className="container">
      <Link to="/home" className="link">
        <h1>Listagem de Tipos de Pagamentos</h1>
      </Link>
        <div className="content">
          <div className="listagem">
            <table>
              <thead>
                <tr>
                  <th>Tipo de Pagamento</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                  {lista.data.map((tipoPagamento)=>{
                    return (
                      <tr key={tipoPagamento.id}>
                        <td> 
                          {tipoPagamento.descricao}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            onClick={()=>removerTipoPagamento(tipoPagamento.id)} 
                            style={{cursor: 'pointer'}}
                          >
                            <FiTrash2 size={20} color="#000" />
                          </button>
                          
                          <button 
                            type="button" 
                            onClick={()=>{
                              setAlteraId(tipoPagamento.id)
                              setAlteraDescricao(tipoPagamento.descricao)
                            }} 
                            style={{cursor: 'pointer'}}
                          > 
                              <FiEdit size={20} color="#000" />
                          </button>
                        </td>
                      </tr>                   
                    )
                  })}
              </tbody>
            </table>
          </div>

      <hr/>

      <div>
        <form onSubmit={cadastrarTipoPagamento} >
          <fieldset>
            <legend>Cadastro Tipo de Pagamento</legend>
              <div>
                <label htmlFor="descricao">Tipo de Pagamento </label>
                <input 
                  id="descricao"  
                  value={descricao} 
                  onChange={event=>setDescricao(event.target.value)} 
                />
              </div>
              <button type="submit">Confirmar</button>
          </fieldset>
        </form>
      </div>

      <hr/>

      <div>
      <form onSubmit={alterarTipoPagamento} >
          <fieldset>
            <legend>Alterar Tipo de Pagamento</legend>
              <div>
                <label htmlFor="descricao" id="tipoPagamento">Tipo de Pagamento </label>
                <input 
                  id="alterardescricao"  
                  value={alteraDescricao} 
                  onChange={event=>setAlteraDescricao(event.target.value)} 
                />
                <input 
                  id="alterarid"  
                  value={alteraId} 
                  style={{display: 'none'}}
                  readOnly
                />
              </div>
              <button type="submit">Confirmar</button>
          </fieldset>
        </form>
      </div>
      </div>
    </div>
  );
}

export default TipoPagamento;
