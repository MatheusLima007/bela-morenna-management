import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import MediumCard from '../../components/MediumCard';
import { postAddress, putAddress } from '../../services/api/address';
import { getCustomers, postCustomers, putCustomers, removeCustomers } from '../../services/api/customers';
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

export interface ICustomersData {
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

const Customers: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<ICustomersData | null>();
  const [data, setData] = useState<ICustomersData[]>([]);
  const [id, setId] = useState<number>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setFormValues({ ...formValues, [name]: mCPF(e.target.value) });
      return;
    }

    if (name === 'telefone') {
      setFormValues({ ...formValues, [name]: phone(e.target.value) });
      return;
    }

    if (name === 'cep') {
      setFormValues({ ...formValues, [name]: cep(e.target.value) });
      return;
    }

    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const mCPF = cpf => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const phone = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const cep = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
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
          const dataCustomers = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cpf: formValues.cpf,
            email: formValues.email,
            enderecoId: formValues.enderecoId,
          };

          const { error, response }: IResponse = await putCustomers(dataCustomers, id);
          if (error) {
            alert(error.data);
            return;
          }

          alert(`Fornecedor ${response.nome} alterado com sucesso`);
        })
        .catch(err => {
          console.log(`err`, err);
        });

      // const dataCustomers = {
      //   nome: formValues.nome,
      //   telefone: formValues.telefone,
      //   cpf: formValues.cpf,
      //   email: formValues.email,
      //   enderecoId: formValues.enderecoId,
      // };

      // const { error, response }: IResponse = await putCustomers(dataCustomers, id);

      // if (error) {
      //   alert(error.data);
      //   return;
      // }

      // alert(`Tamanho ${response.nome} atualizado com sucesso`);
    } else {
      await postAddress(dataAddress)
        .then(async (data: IResponse) => {
          const dataCustomers = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cpf: formValues.cpf,
            email: formValues.email,
            enderecoId: data.response.id,
          };

          const { error, response }: IResponse = await postCustomers(dataCustomers);
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
    listCustomers();
  };
  console.log(`formValues`, formValues);
  const listCustomers = async (data?: any) => {
    const { error, response }: IResponse = await getCustomers(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const deleteOrUpdateCustomers = async (id?: number, data?: ICustomersData) => {
    if (data) {
      setFormValues(data);
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir esse fornecedor?')) {
        const { error }: IResponse = await removeCustomers(id);

        if (error) {
          alert(error.data);
          return;
        }

        listCustomers();
      }
    }
  };

  useEffect(() => {
    listCustomers();
  }, []);

  return (
    <Container>
      <ContentHeader title="Clientes" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar clientes</FormTitle>
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
                  type="text"
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
                <InputForm type="text" name="cep" onChange={handleInputChange} value={formValues?.cep} required />
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
                <MediumCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateCustomers} />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Customers;
