import React, { ReactNode } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Container, Flex, Tag } from './styles';

interface ISimpleCardProps {
  tagColor: string;
  title: string;
  amount?: string;
  id: string;
  data?: string;
  callback: (id: string, data?: string) => void;
}

const SimpleCard: React.FC<ISimpleCardProps> = ({ tagColor, title, amount, id, data, callback }) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>{title}</small>
    </div>
    <h3>{amount}</h3>
    <Flex>
      <FiEdit
        onClick={() => {
          callback(id, data);
        }}
      />
      <FiTrash2
        style={{ marginLeft: '5' }}
        onClick={() => {
          callback(id);
        }}
      />
    </Flex>
  </Container>
);

export default SimpleCard;
