import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IProductsData } from '../../pages/Products';
import { IProvidersData } from '../../pages/Providers';
import { Container, Flex, Tag } from './styles';

interface IProductCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: IProductsData;
  callback: (id: number, data?: IProductsData) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>Marca: {data.marca}</small>
      <small>Quantidade: {data.quantidade}</small>
      <small>Tamanho: {data.descricaoTamanho}</small>
    </div>
    <h3>{data.descricao}</h3>
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

export default ProductCard;
