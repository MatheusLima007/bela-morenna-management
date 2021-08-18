import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IProductsData } from '../../pages/Products';
import { IProvidersData } from '../../pages/Providers';
import { IPurchasesData } from '../../pages/Purchases';
import { ISalesData } from '../../pages/Sales';
import { Container, Flex, Tag } from './styles';

interface ISalesCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: ISalesData;
  callback: (id: number, data?: ISalesData) => void;
}

const SalesCard: React.FC<ISalesCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>Cliente: {data.nomeCliente}</small>
      <small>Preco total: {data.precoTotal}</small>
      <small>Quantidade: {data.quantidade}</small>
      <small>Tamanho: {data.tamanhoDescricao}</small>
    </div>
    <h3>{data.produtoDescricao}</h3>
    <Flex>
      <FiEdit
        onClick={() => {
          callback(data.id, data);
        }}
      />
      <FiTrash2
        style={{ marginLeft: '5' }}
        onClick={() => {
          callback(data.id);
        }}
      />
    </Flex>
  </Container>
);

export default SalesCard;
