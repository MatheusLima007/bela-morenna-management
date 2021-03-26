import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Login from './pages/Login'
import TelaInicial from './pages/TelaInicial'
import Tamanho from './pages/Tamanho'
import TipoPagamento from './pages/TipoPagamento'
import Endereco from './pages/Endereco'
//import Pagamento from './pages/Pagamento'

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={TelaInicial} />
                <Route path="/tamanhos" component={Tamanho} />
                <Route path="/tipo-pagamentos" component={TipoPagamento} />
                <Route path="/enderecos" component={Endereco} />
                {/* <Route path="/pagamentos" component={Pagamento} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} /> */}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes