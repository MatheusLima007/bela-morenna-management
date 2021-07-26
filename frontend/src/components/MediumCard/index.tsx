import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IProvidersData } from '../../pages/Providers';
import { Container, Flex, Tag } from './styles';

interface IMediumCardProps {
  tagColor: string;
  title?: string;
  amount?: string;
  id?: string;
  data?: IProvidersData;
  callback: (id: number, data?: IProvidersData) => void;
}

const MediumCard: React.FC<IMediumCardProps> = ({ tagColor, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>{data.cnpj ? `CNPJ: ${data.cnpj}` : `CPF: ${data.cpf}`}</small>
      <small>Cidade: {data.cidade}</small>
      <small>Estado: {data.estado}</small>
    </div>
    <h3>{data.nome}</h3>
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

export default MediumCard;
