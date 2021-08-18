import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IProductsData } from '../../pages/Products';
import { IProvidersData } from '../../pages/Providers';
import { IPurchasesData } from '../../pages/Purchases';
import { Container, Flex, Tag } from './styles';

interface IPurchasesCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: IPurchasesData;
  callback: (id: number, data?: IPurchasesData) => void;
}

const PurchasesCard: React.FC<IPurchasesCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>Fornecedor: {data.nomeFornecedor}</small>
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

export default PurchasesCard;
