import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IProductsData } from '../../pages/Products';
import { IProvidersData } from '../../pages/Providers';
import { IPurchasesData, ISelectedProducts } from '../../pages/Purchases';
import { Container, Flex, Tag } from './styles';

interface IProductListCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: ISelectedProducts;
  callback: (data?: ISelectedProducts) => void;
}

const ProductListCard: React.FC<IProductListCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>
        Produto: {data.produtoName} - {data.tamanhoName}
      </small>
      <small>Quantidade: {data.quantidade}</small>
    </div>

    <Flex>
      <FiTrash2
        style={{ marginLeft: '5' }}
        onClick={() => {
          callback(data);
        }}
      />
    </Flex>
  </Container>
);

export default ProductListCard;
