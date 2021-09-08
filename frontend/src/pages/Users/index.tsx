import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import MediumCard from '../../components/MediumCard';
import { postAddress, putAddress } from '../../services/api/address';
import { getUsers, postUsers, putUsers, removeUsers } from '../../services/api/users';
import {
  Container,
  ContainerInput,
  Content,
  ContentForm,
  ContentList,
  Flex,
  Form,
  FormTitle,
  InputForm,
  List,
  Span,
} from './styles';

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

export interface IUsersData {
  id?: number;
  bairro: string;
  cep: number;
  cidade: string;
  cpf: string;
  email: string;
  estado: string;
  nome: string;
  numero: string;
  rua: string;
  telefone: string;
  enderecoId?: number;
}

const Users: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<IUsersData | null>();
  const [data, setData] = useState<IUsersData[]>([]);
  const [id, setId] = useState<number>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`e`, e);
    const dataAddress = {
      cep: formValues.cep,
      bairro: formValues.bairro,
      rua: formValues.rua,
      numero: formValues.numero,
      cidade: formValues.cidade,
      estado: formValues.estado,
    };

    if (id) {
      await putAddress(dataAddress, formValues.enderecoId)
        .then(async (data: IResponse) => {
          const dataUsers = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cpf: formValues.cpf,
            email: formValues.email,
            enderecoId: formValues.enderecoId,
          };

          const { error, response }: IResponse = await putUsers(dataUsers, id);
          if (error) {
            alert(error.data);
            return;
          }

          alert(`Fornecedor ${response.nome} alterado com sucesso`);
        })
        .catch(err => {
          console.log(`err`, err);
        });

      // const dataUsers = {
      //   nome: formValues.nome,
      //   telefone: formValues.telefone,
      //   cpf: formValues.cpf,
      //   email: formValues.email,
      //   enderecoId: formValues.enderecoId,
      // };

      // const { error, response }: IResponse = await putUsers(dataUsers, id);

      // if (error) {
      //   alert(error.data);
      //   return;
      // }

      // alert(`Tamanho ${response.nome} atualizado com sucesso`);
    } else {
      await postAddress(dataAddress)
        .then(async (data: IResponse) => {
          const dataUsers = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cpf: formValues.cpf,
            email: formValues.email,
            enderecoId: data.response.id,
          };

          const { error, response }: IResponse = await postUsers(dataUsers);
          if (error) {
            alert(error.data);
            return;
          }

          alert(`Fornecedor ${response.nome} criado com sucesso`);
        })
        .catch(error => {
          console.log(`err`, error.data);
        });
    }

    setFormValues({
      id: null,
      bairro: '',
      cep: null,
      cidade: '',
      cpf: '',
      email: '',
      estado: '',
      nome: '',
      numero: '',
      rua: '',
      telefone: '',
      enderecoId: null,
    });
    setId(0);
    listUsers();
  };
  //console.log(`formValues`, formValues);
  const listUsers = async (data?: any) => {
    const { error, response }: IResponse = await getUsers(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const deleteOrUpdateUsers = async (id?: number, data?: IUsersData) => {
    if (data) {
      setFormValues(data);
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir esse fornecedor?')) {
        const { error }: IResponse = await removeUsers(id);

        if (error) {
          alert(error.data);
          return;
        }

        listUsers();
      }
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <Container>
      <ContentHeader title="Usuários" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar usuários</FormTitle>
            <ContainerInput>
              <InputForm type="text" name="nome" onChange={handleInputChange} value={formValues?.nome} required />
              <Span>Nome completo</Span>
            </ContainerInput>

            <ContainerInput>
              <InputForm type="email" name="email" onChange={handleInputChange} value={formValues?.email} required />
              <Span>E-mail</Span>
            </ContainerInput>

            <Flex>
              <ContainerInput>
                <InputForm type="text" name="cpf" onChange={handleInputChange} value={formValues?.cpf} required />
                <Span>CPF</Span>
              </ContainerInput>

              <ContainerInput>
                <InputForm
                  type="number"
                  name="telefone"
                  onChange={handleInputChange}
                  value={formValues?.telefone}
                  required
                />
                <Span>Telefone</Span>
              </ContainerInput>
            </Flex>

            <Flex>
              <ContainerInput>
                <InputForm type="number" name="cep" onChange={handleInputChange} value={formValues?.cep} required />
                <Span>CEP</Span>
              </ContainerInput>

              <ContainerInput>
                <InputForm
                  type="number"
                  name="numero"
                  onChange={handleInputChange}
                  value={formValues?.numero}
                  required
                />
                <Span>Número</Span>
              </ContainerInput>
            </Flex>

            <ContainerInput>
              <InputForm type="text" name="bairro" onChange={handleInputChange} value={formValues?.bairro} required />
              <Span>Bairro</Span>
            </ContainerInput>

            <ContainerInput>
              <InputForm type="text" name="rua" onChange={handleInputChange} value={formValues?.rua} required />
              <Span>Rua</Span>
            </ContainerInput>

            <Flex>
              <ContainerInput>
                <InputForm type="text" name="cidade" onChange={handleInputChange} value={formValues?.cidade} required />
                <Span>Cidade</Span>
              </ContainerInput>

              <ContainerInput>
                <InputForm type="text" name="estado" onChange={handleInputChange} value={formValues?.estado} required />
                <Span>Estado</Span>
              </ContainerInput>
            </Flex>
            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {data &&
              data.map(item => (
                <MediumCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateUsers} />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Users;
