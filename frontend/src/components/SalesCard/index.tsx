import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IData } from '../../pages/ListSales';
import { IProductsData } from '../../pages/Products';
import { IProvidersData } from '../../pages/Providers';
import { IPurchasesData } from '../../pages/Purchases';
import { ISalesData } from '../../pages/Sales';
import { Container, Flex, FlexColumn, Tag } from './styles';

interface ISalesCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: IData;
  callback: (data?: IData) => void;
}

const SalesCard: React.FC<ISalesCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <Flex>
      <FlexColumn style={{ width: '300px' }}>
        <small>Cliente: {data.clienteNome}</small>
        <small>Usuario: {data.usuarioNome}</small>
      </FlexColumn>
      <FlexColumn style={{ marginLeft: '100px' }}>
        <small>Preco total: {data.precoTotal}</small>
        <small>Data: {data.data}</small>
      </FlexColumn>
    </Flex>
    <Flex>
      {/* <FiEdit
        onClick={() => {
          callback(data.id, data);
        }}
      /> */}
      <FiTrash2
        style={{ marginLeft: '5', marginRight: '20' }}
        onClick={() => {
          callback(data);
        }}
      />
    </Flex>
  </Container>
);

export default SalesCard;
