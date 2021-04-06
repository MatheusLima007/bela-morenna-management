import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/formulario.css'

import api from "../api";

function Tamanho() {
  const history = useHistory()
  if(!localStorage.getItem('token')){
    history.push('/')
  }
  
  const [lista, setLista] = useState()
  const [descricao, setDescricao] = useState('')
  const [alteraId, setAlteraId] = useState('')
  const [alteraDescricao, setAlteraDescricao] = useState('')

  // const token = JSON.parse(localStorage.getItem("token"))
  // const AuthStr = `Bearer ${token}`
  // { headers: { Authorization: AuthStr } }

  useEffect(()=>{
    api.get('tamanhos').then(response=>{
        response.data.json().then(tamanhos => {
          setLista(tamanhos)
        })
    })
  }, [lista])

  if(!lista) {
    return <p>Carregando...</p>
  }

  async function cadastrarTramanho(event){
    event.preventDefault()

    try {
        await api.post('tamanhos', {descricao})
    } catch (error) {
        alert(error.response.data) 
        console.log(error.response.data)
        return
    }
    alert(`Cadastro de tamanho "${descricao}" realizado com sucesso!`)

    setDescricao('')
  }

  async function removerTamanho(id){
    const removeId = id.toString()
    try {
        await api.delete(`tamanhos/${removeId}`)
    } catch (error) {
        alert(error.response.data)
        return
    }
    alert(`Tamanho removido com sucesso!`)
  }

  async function alterarTamanho(event){
    event.preventDefault()
    try {
        await api.put(`tamanhos/${alteraId}`, {descricao: alteraDescricao})
    } catch (error) {
        alert(error.response.data)
        return
    }

    setAlteraDescricao('')
    setAlteraId('')

    alert(`Tamanho "${alteraDescricao}" alterado com sucesso!`)
  }

  return ( 
    <div className="container">
      <Link to="/home" className="link">
        <h1>Listagem de Tamanho</h1>
      </Link>
      
        <div className="content">
          <div className="listagem">
            <table>
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                  {lista.data.map((tamanho)=>{
                    return (
                      <tr key={tamanho.id}>
                        <td> 
                          {tamanho.descricao}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            onClick={()=>removerTamanho(tamanho.id)} 
                            style={{cursor: 'pointer'}}
                          >
                            <FiTrash2 size={20} color="#000" />
                          </button>
                          
                          <button 
                            type="button" 
                            onClick={()=>{
                              setAlteraId(tamanho.id)
                              setAlteraDescricao(tamanho.descricao)
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
          <form onSubmit={cadastrarTramanho} >
            <fieldset>
              <legend>Cadastro Tamanho</legend>
                <div>
                  <label htmlFor="descricao">Tamanho </label>
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
        <form onSubmit={alterarTamanho} >
            <fieldset>
              <legend>Alterar Tamanho</legend>
                <div>
                  <label htmlFor="descricao" id="tamanho">Tamanho </label>
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

export default Tamanho;
