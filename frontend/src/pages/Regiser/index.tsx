import React, { useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const Register: React.FC<IRouteParams> = ({ match }) => {
  const movimentType = match.params.type;

  const title = useMemo(() => {
    switch (movimentType) {
      case 'sales':
        return 'Vendas'
      case 'purchases':
        return 'Compras'
      case 'products':
        return 'Produtos'
      case 'customers':
        return 'Clientes'
      case 'providers':
        return 'Fornecedores'
      case 'users':
        return 'Usuarios'
      case 'payments':
        return 'Pagamentos'
      default:
        return 'Tamanhos'
    }
  }, [movimentType]);

  useEffect(() => {
   
  }, []);

  return (
    <Container>
      <ContentHeader title={title} lineColor="#4E41F0">

      </ContentHeader>

      <Content>
        {}
      </Content>
    </Container>
  );
};

export default Register;
