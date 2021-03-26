import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from "../api";

function Endereco() {
  const history = useHistory()
  if(!localStorage.getItem('token')){
    history.push('/')
  }

  const [lista, setLista] = useState()
  const [cep, setCep] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  //const [descricao, setDescricao] = useState('')

  const [alteraId, setAlteraId] = useState('')
  const [alteraCep, setAlteraCep] = useState('')
  const [alteraBairro, setAlteraBairro] = useState('')
  const [alteraRua, setAlteraRua] = useState('')
  const [alteraNumero, setAlteraNumero] = useState('')
  const [alteraCidade, setAlteraCidade] = useState('')
  const [alteraEstado, setAlteraEstado] = useState('')

  useEffect(()=>{
    api.get('enderecos').then(response=>{
        setLista(response.data)
    })
  }, [lista])

  if(!lista) {
    return <p>Carregando...</p>
  }

  async function cadastrarEndereco(event){
    event.preventDefault()

    const data = {
      cep,
	    bairro,
	    rua,
	    numero,
	    cidade,
      estado
    }

    try {
        await api.post('enderecos', data)
    } catch (error) {
      console.log(error.response)
        alert(error.response.data) 
        return
    }
    alert(`Cadastro de Endereco "${data.cep}" realizado com sucesso!`)

    setCep('')
    setBairro('')
    setRua('')
    setNumero('')
    setCidade('')
    setEstado('')
  }
  async function removerEndereco(id){
    const removeId = id.toString()
    try {
        await api.delete(`enderecos/${removeId}`)
    } catch (error) {
        alert(error.response.data)
        return
    }
    alert(`Endereço removido com sucesso!`)
  }
  async function alterarEndereco(event){
    event.preventDefault()

    const dataAlterar = {
      cep: alteraCep,
	    bairro: alteraBairro,
	    rua: alteraRua,
	    numero: alteraNumero,
	    cidade: alteraCidade,
      estado: alteraEstado
    }

    try {
        await api.put(`enderecos/${alteraId}`, dataAlterar)
    } catch (error) {
        alert(error.response.data)
        return
    }

    alert(`Endereco "${dataAlterar.cep}" alterado com sucesso!`)

    setAlteraId('')
    setAlteraCep('')
    setAlteraBairro('')
    setAlteraRua('')
    setAlteraNumero('')
    setAlteraCidade('')
    setAlteraEstado('')
  }

  return ( 
    <div className="container">
      <Link to="/home" className="link">
        <h1>Listagem de Endereços</h1>
      </Link>
      <div className="content2">
        <div className="listagem">
          <table>
            <thead>
                <tr>
                  <th>Cep</th>
                  <th>Bairro</th>
                  <th>Rua</th>
                  <th>Nº da casa</th>
                  <th>Cidade</th>
                  <th>Estado(UF)</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                  {lista.data.map((endereco)=>{
                    return (
                      <tr key={endereco.id}>
                        <td>{endereco.cep}</td>
                        <td>{endereco.bairro}</td>
                        <td>{endereco.rua}</td>
                        <td>{endereco.numero}</td>
                        <td>{endereco.cidade}</td>
                        <td>{endereco.estado}</td>
                        <td>
                          <button 
                            type="button" 
                            onClick={()=>removerEndereco(endereco.id)} 
                            style={{cursor: 'pointer'}}
                          >
                            <FiTrash2 size={20} color="#000" />
                          </button>
                          
                          <button 
                            type="button" 
                            onClick={()=>{
                              setAlteraId(endereco.id)
                              setAlteraCep(endereco.cep)
                              setAlteraBairro(endereco.bairro)
                              setAlteraRua(endereco.rua)
                              setAlteraNumero(endereco.numero)
                              setAlteraCidade(endereco.cidade)
                              setAlteraEstado(endereco.estado)
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
        <div className="cadastrarEndereco">
          <form onSubmit={cadastrarEndereco} >
            <fieldset>
              <legend>Cadastro Endereço</legend>
                <div >
                  
                    <label htmlFor="cep">Cep    </label>
                    <input 
                      id="cep"  
                      value={cep} 
                      onChange={event=>setCep(event.target.value)} 
                    />
                  
                    <label htmlFor="bairro">Bairro </label>
                    <input 
                      id="bairro"  
                      value={bairro} 
                      onChange={event=>setBairro(event.target.value)} 
                    />
                  
                    <label htmlFor="rua">Rua </label>
                    <input 
                      id="rua"  
                      value={rua} 
                      onChange={event=>setRua(event.target.value)} 
                    />
                  
                    <label htmlFor="numero">Numero</label>
                    <input 
                      id="numero"  
                      value={numero} 
                      onChange={event=>setNumero(event.target.value)} 
                    />
                  
                    <label htmlFor="cidade">Cidade </label>
                    <input 
                      id="cidade"  
                      value={cidade} 
                      onChange={event=>setCidade(event.target.value)} 
                    />
                  
                    <label htmlFor="estado">Estado </label>
                    <input 
                      id="estado"  
                      value={estado} 
                      onChange={event=>setEstado(event.target.value)} 
                    />
                  
                </div>
                <button type="submit">Confirmar</button>
            </fieldset>
          </form>
        </div>
        <hr/>
        <div className="alterarEndereco">
        <form onSubmit={alterarEndereco} >
            <fieldset>
              <legend>Alterar Endereço</legend>
                <div>
                  <label htmlFor="cep" id="cep">Cep </label>
                  <input 
                    id="alterarcep"  
                    value={alteraCep} 
                    onChange={event=>setAlteraCep(event.target.value)} 
                  />

                  <label htmlFor="bairro" id="bairro">Bairro </label>
                  <input 
                    id="alterarbairro"  
                    value={alteraBairro} 
                    onChange={event=>setAlteraBairro(event.target.value)} 
                  />

                  <label htmlFor="rua" id="rua">Rua </label>
                  <input 
                    id="alterarrua"  
                    value={alteraRua} 
                    onChange={event=>setAlteraRua(event.target.value)} 
                  />

                  <label htmlFor="numero" id="numero">Numero</label>
                  <input 
                    id="alterarnumero"  
                    value={alteraNumero} 
                    onChange={event=>setAlteraNumero(event.target.value)} 
                  />

                  <label htmlFor="cidade" id="cidade">Cidade </label>
                  <input 
                    id="alterarcidade"  
                    value={alteraCidade} 
                    onChange={event=>setAlteraCidade(event.target.value)} 
                  />

                  <label htmlFor="estado" id="estado">Estado </label>
                  <input 
                    id="alterarestado"  
                    value={alteraEstado} 
                    onChange={event=>setAlteraEstado(event.target.value)} 
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

export default Endereco;