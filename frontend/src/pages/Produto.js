// import React, { useEffect, useState } from 'react';
// import { FiTrash2, FiEdit } from 'react-icons/fi'
// import { useHistory } from 'react-router-dom';

// import api from "../api";

// function Pagamento() {
//   const history = useHistory()
//   if(!localStorage.getItem('token')){
//     history.push('/')
//   }

//   const [lista, setLista] = useState()

//   useEffect(()=>{
//     api.get('pagamentos').then(response=>{
//         setLista(response.data)
//     })
//     setInterval(500)
//   }, [lista])

  
//   const [precoTotal, setPrecoTotal] = useState('')
//   const [parcela, setParcela] = useState('')
//   const [descricao, setDescricao] = useState('')
//   const [tipoPagamentoId, setTipoPagamentoId] = useState('')
//   const listaTipoPagamento = lista.tipoPagamentoData
//   console.log(lista.data, lista.tipoPagamentoData)
//   //const [descricao, setDescricao] = useState('')

//   const [alteraId, setAlteraId] = useState('')
//   const [alteraPrecoTotal, setAlteraPrecoTotal] = useState('')
//   const [alteraParcela, setAlteraParcela] = useState('')
//   const [alteraDescricao, setAlteraDescricao] = useState('')
//   const [alteraTipoPagamentoId, setAlteraTipoPagamentoId] = useState('')

 

//   if(!lista) {
//     return <p>Carregando...</p>
//   }

//   async function cadastrarPagamento(event){
//     event.preventDefault()
//     const data = {
//       precoTotal,
// 	    parcela,
// 	    tipoPagamentoId,
//     }

//     try {
//         await api.post('pagamentos', data)
//     } catch (error) {
//       alert(error.response.data) 
//       return
//     }
//     alert(`Cadastro de Pagamento realizado com sucesso!`)

//     setPrecoTotal('')
//     setParcela('')
//     setDescricao('')
//     setTipoPagamentoId('')
//   }
//   async function removerPagamento(id){
//     const removeId = id.toString()
//     try {
//         await api.delete(`pagamentos/${removeId}`)
//     } catch (error) {
//         alert(error.response.data)
//         return
//     }
//     alert(`Pagamento removido com sucesso!`)
//   }
//   async function alterarPagamento(event){
//     event.preventDefault()

//     const dataAlterar = {
//       precoTotal: alteraPrecoTotal,
// 	    parcela: alteraParcela,
// 	    tipoPagamentoId: alteraTipoPagamentoId,
//     }

//     try {
//         await api.put(`pagamentos/${alteraId}`, dataAlterar)
//     } catch (error) {
//         alert(error.response.data)
//         return
//     }

//     alert(`Pagamento alterado com sucesso!`)

//     setAlteraId('')
//     setAlteraPrecoTotal('')
//     setAlteraParcela('')
//     setAlteraDescricao('')
//     setAlteraTipoPagamentoId('')
//   }

//   return ( 
//     <div>
//       <fieldset className="listarPagamento">
//       <legend>Listagem de Pagamentos</legend>
//         <div>
//           <table>
//            <thead>
//               <tr>
//                 <th>Preço total</th>
//                 <th>parcelas</th>
//                 <th>Tipo de pagamento</th>
//                 <th>Opções</th>
//               </tr>
//             </thead>
//             <tbody>
//                 {lista.data.map((pagamento)=>{
//                   return (
//                     <tr key={pagamento.id}>
//                       <td>R$ {pagamento.precoTotal}</td>
//                       <td>{pagamento.parcela}</td>
//                       <td>{pagamento.descricao}</td>
//                       <td>
//                         <button 
//                           type="button" 
//                           onClick={()=>removerPagamento(pagamento.id)} 
//                           style={{cursor: 'pointer'}}
//                         >
//                           <FiTrash2 size={20} color="#000" />
//                         </button>
                        
//                         <button 
//                           type="button" 
//                           onClick={()=>{
//                             setAlteraId(pagamento.id)
//                             setAlteraPrecoTotal(pagamento.precoTotal)
//                             setAlteraParcela(pagamento.parcela)
//                             setAlteraDescricao(pagamento.descricao)
//                             setAlteraTipoPagamentoId(pagamento.tipoPagamentoId)
//                           }} 
//                           style={{cursor: 'pointer'}}
//                         > 
//                             <FiEdit size={20} color="#000" />
//                         </button>
//                       </td>
//                     </tr>                   
//                   )
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </fieldset>
//       <hr/>
//       <div className="cadastrarPagamento">
//         <form onSubmit={cadastrarPagamento} >
//           <fieldset>
//             <legend>Cadastro Pagamento</legend>
//               <div>
//                 <label htmlFor="precoTotal">Preço total </label>
//                 <input 
//                   id="precoTotal"  
//                   value={precoTotal} 
//                   onChange={event=>setPrecoTotal(event.target.value)} 
//                 />
                
//                 <label htmlFor="parcela">Parcela </label>
//                 <input 
//                   id="parcela"  
//                   value={parcela} 
//                   onChange={event=>setParcela(event.target.value)} 
//                 />

//                 <label htmlFor="tipoPagamento">Tipo de pagamento </label>
//                 <select name="tipoPagamento" onChange={event=>setTipoPagamentoId(event.target.value)}>
//                   <option value=""></option>
//                   {listaTipoPagamento.map((tipoPagamento)=>{
//                       return(
//                         <option 
//                           key={tipoPagamento.id}
//                           value={tipoPagamento.id}
//                         >{tipoPagamento.descricao}</option> 
//                       )
//                     }
//                   )}
//                 </select>
//               </div>
//               <button type="submit">Confirmar</button>
//           </fieldset>
//         </form>
//       </div>
//       <hr/>
//       <div className="alterarPagamento">
//       <form onSubmit={alterarPagamento} >
//           <fieldset>
//             <legend>Alterar Pagamento</legend>
//               <div>
//                 <label htmlFor="alteraprecoTotal" id="alteraprecoTotal">Preço total </label>
//                 <input 
//                   id="alteraprecoTotal"  
//                   value={alteraPrecoTotal} 
//                   onChange={event=>setAlteraPrecoTotal(event.target.value)} 
//                 />

//                 <label htmlFor="alteraparcela" id="alteraparcela">Parcela </label>
//                 <input 
//                   id="alteraparcela"  
//                   value={alteraParcela} 
//                   onChange={event=>setAlteraParcela(event.target.value)} 
//                 />

//                 <label htmlFor="alteratipoPagamento">Tipo de pagamento </label>
//                 <select name="alteratipoPagamento" onChange={event=>setTipoPagamentoId(event.target.value)}>
//                   <option value=""></option>
//                   {listaTipoPagamento.map((tipoPagamento)=>{
//                       return(
//                         <option 
//                           key={tipoPagamento.id}
//                           value={tipoPagamento.id}
//                         >{tipoPagamento.descricao}</option> 
//                       )
//                     }
//                   )}
//                 </select>

//                 <input 
//                   id="alterarid"  
//                   value={alteraId} 
//                   style={{display: 'none'}}
//                   readOnly
//                 />
//               </div>
//               <button type="submit">Confirmar</button>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Pagamento;