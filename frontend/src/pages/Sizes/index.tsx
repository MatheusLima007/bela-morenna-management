import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import Input from '../../components/Input';
import SimpleCard from '../../components/SimpleCard';
import { getSize, postSize, putSize, removeSize } from '../../services/api/size';
import { Container, Content, ContentForm, ContentList, Form, FormTitle, List } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IResponse {
  response?: any;
  error?: any;
}

interface IData {
  descricao?: string;
}

export interface IDataSize {
  id: string;
  descricao?: string;
}

const Sizes: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<IData>({});
  const [data, setData] = useState<IDataSize[]>([]);
  const [id, setId] = useState<string>('');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value.toUpperCase() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (id) {
      const { error, response }: IResponse = await putSize(data, id);

      if (error) {
        alert(error.data);
        return;
      }

      alert(`Tamanho ${response.descricao} atualizado com sucesso`);
    } else {
      const { error, response }: IResponse = await postSize(data);

      if (error) {
        alert(error.data);
        return;
      }

      alert(`Tamanho ${response.descricao} criado com sucesso`);
    }

    setFormValues({ descricao: '' });
    setId('');
    listSize();
  };

  const listSize = async (data?: any) => {
    const { error, response }: IResponse = await getSize(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response.data);
  };

  const deleteOrUpdateSize = async (id?: string, data?: string) => {
    if (data) {
      setFormValues({ descricao: data });
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir esse tamanho?')) {
        const { error }: IResponse = await removeSize(id);

        if (error) {
          alert('Algo de errado não está certo!');
          return;
        }

        listSize();
      }
    }
  };

  useEffect(() => {
    listSize();
  }, []);

  return (
    <Container>
      <ContentHeader title="Tamanhos" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar tamanho</FormTitle>

            <Input
              name="descricao"
              type="descricao"
              placeholder="Digite o tamanaho para cadastrar..."
              required
              value={formValues.descricao}
              onChange={handleInputChange}
            />

            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {data.map(item => (
              <SimpleCard
                key={item.id}
                tagColor="#05a048"
                title="Descricao do tamanho"
                id={item.id}
                data={item.descricao}
                amount={item?.descricao}
                callback={deleteOrUpdateSize}
              />
            ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Sizes;
