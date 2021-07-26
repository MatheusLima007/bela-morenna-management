import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import Input from '../../components/Input';
import MediumCard from '../../components/MediumCard';
import SimpleCard from '../../components/SimpleCard';
import { postAddress, putAddress } from '../../services/api/address';
import { getProviders, postProviders, putProviders, removeProviders } from '../../services/api/providers';
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

export interface IProvidersData {
  id?: number;
  bairro?: string;
  cep?: number;
  cidade?: string;
  cnpj?: string;
  cpf?: string;
  email?: string;
  estado?: string;
  nome?: string;
  numero?: string;
  rua?: string;
  telefone?: string;
  enderecoId?: number;
}

const Providers: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<IProvidersData | null>();
  const [data, setData] = useState<IProvidersData[]>([]);
  const [id, setId] = useState<number>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
          const dataProviders = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cnpj: formValues.cnpj,
            email: formValues.email,
            enderecoId: formValues.enderecoId,
          };

          const { error, response }: IResponse = await putProviders(dataProviders, id);
          if (error) {
            alert(error.data);
            return;
          }

          alert(`Fornecedor ${response.nome} alterado com sucesso`);
        })
        .catch(err => {
          console.log(`err`, err);
        });

      // const dataProviders = {
      //   nome: formValues.nome,
      //   telefone: formValues.telefone,
      //   cnpj: formValues.cnpj,
      //   email: formValues.email,
      //   enderecoId: formValues.enderecoId,
      // };

      // const { error, response }: IResponse = await putProviders(dataProviders, id);

      // if (error) {
      //   alert(error.data);
      //   return;
      // }

      // alert(`Tamanho ${response.nome} atualizado com sucesso`);
    } else {
      await postAddress(dataAddress)
        .then(async (data: IResponse) => {
          const dataProviders = {
            nome: formValues.nome,
            telefone: formValues.telefone,
            cnpj: formValues.cnpj,
            email: formValues.email,
            enderecoId: data.response.id,
          };

          const { error, response }: IResponse = await postProviders(dataProviders);
          if (error) {
            alert(error.data);
            return;
          }

          alert(`Fornecedor ${response.nome} criado com sucesso`);
        })
        .catch(err => {
          console.log(`err`, err);
        });
    }

    setFormValues(null);
    setId(0);
    listProviders();
  };

  const listProviders = async (data?: any) => {
    const { error, response }: IResponse = await getProviders(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const deleteOrUpdateProviders = async (id?: number, data?: IProvidersData) => {
    if (data) {
      setFormValues(data);
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir esse fornecedor?')) {
        const { error }: IResponse = await removeProviders(id);

        if (error) {
          alert('Algo de errado não está certo!');
          return;
        }

        listProviders();
      }
    }
  };

  useEffect(() => {
    listProviders();
  }, []);

  return (
    <Container>
      <ContentHeader title="Fornecedores" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar fornecedor</FormTitle>
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
                <InputForm type="text" name="cnpj" onChange={handleInputChange} value={formValues?.cnpj} required />
                <Span>CNPJ</Span>
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
                <MediumCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateProviders} />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Providers;
