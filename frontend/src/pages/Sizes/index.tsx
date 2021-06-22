import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { uuid } from 'uuidv4';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import Input from '../../components/Input';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { Container, Content, ContentForm, ContentList, Form, FormTitle, List } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  descricao?: string;
}

function useQuery() {
  const pathname = useLocation().pathname;
  return pathname.substring(pathname.lastIndexOf('/') + 1);
}

const Sizes: React.FC<IRouteParams> = ({ match }) => {
  let id = useQuery();
  const [formValues, setFormValues] = useState<IData>({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    console.log(`data`, name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(`data`, data);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <ContentHeader title="Tamanhos" lineColor="#4E41F0"> </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar tamanho</FormTitle>

            <Input type="descricao" placeholder="descricao" required onChange={handleInputChange} />

            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {/* {data.map((item) => ( */}
              <HistoryFinanceCard
                key='1'
                tagColor='#000'
                title='card'
                subtitle='card subtitle'
                amount='50000'
              />
            {/* ))} */}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Sizes;
