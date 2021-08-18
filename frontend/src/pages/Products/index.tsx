import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import MediumCard from '../../components/MediumCard';
import ProductCard from '../../components/ProductsCard';
import { getProducts, postProducts, putProducts, removeProducts } from '../../services/api/products';
import { getSize } from '../../services/api/size';
import { IDataSize } from '../Sizes';
import {
  Button,
  Container,
  ContainerInput,
  Content,
  ContentForm,
  ContentList,
  Form,
  FormTitle,
  InputForm,
  List,
  Select,
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

export interface IProductsData {
  id?: number;
  descricao: string;
  quantidade: number;
  marca: string;
  descricaoTamanho?: string;
  tamanhoId: number;
}

const Products: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<IProductsData | null>();
  const [data, setData] = useState<IProductsData[]>([]);
  const [dataSizes, setDataSizes] = useState<IDataSize[]>([]);
  const [id, setId] = useState<number>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`e`, e);

    if (!formValues?.tamanhoId) {
      alert(`Selecione um tamanho valido!`);
      return;
    }

    const dataProducts = {
      descricao: formValues.descricao,
      quantidade: formValues.quantidade,
      marca: formValues.marca,
      tamanhoId: formValues.tamanhoId,
    };

    if (id) {
      const { error, response }: IResponse = await putProducts(dataProducts, id);

      if (error) {
        alert(error.data);
        return;
      }

      alert(`Produto ${response.descricao} alterado com sucesso`);
      // const dataProducts = {
      //   nome: formValues.nome,
      //   telefone: formValues.telefone,
      //   cpf: formValues.cpf,
      //   email: formValues.email,
      //   enderecoId: formValues.enderecoId,
      // };

      // const { error, response }: IResponse = await putProducts(dataProducts, id);

      // if (error) {
      //   alert(error.data);
      //   return;
      // }

      // alert(`Tamanho ${response.nome} atualizado com sucesso`);
    } else {
      const { error, response }: IResponse = await postProducts(dataProducts);
      if (error) {
        alert(error.data);
        return;
      }

      alert(`Produto ${response.descricao} criado com sucesso`);
    }

    setFormValues({
      descricao: '',
      quantidade: null,
      marca: '',
      descricaoTamanho: '',
      tamanhoId: null,
    });
    setId(0);
    listProducts();
    listSizes();
  };

  const listProducts = async (data?: any) => {
    const { error, response }: IResponse = await getProducts(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const listSizes = async (data?: any) => {
    const { error, response }: IResponse = await getSize();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataSizes(response?.data);
  };

  const deleteOrUpdateProducts = async (id?: number, data?: IProductsData) => {
    if (data) {
      setFormValues(data);
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir esse produto?')) {
        const { error }: IResponse = await removeProducts(id);

        if (error) {
          alert(error.data);
          return;
        }

        listProducts();
        listSizes();
      }
    }
  };

  const onChange = event => {
    setFormValues({ ...formValues, tamanhoId: event.target.value });
  };

  useEffect(() => {
    listProducts();
    listSizes();
  }, []);

  return (
    <Container>
      <ContentHeader title="Produtos" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Cadastrar produtos</FormTitle>
            <ContainerInput>
              <InputForm
                type="text"
                name="descricao"
                onChange={handleInputChange}
                value={formValues?.descricao}
                required
              />
              <Span>Descrição</Span>
            </ContainerInput>

            <ContainerInput>
              <InputForm type="text" name="marca" onChange={handleInputChange} value={formValues?.marca} required />
              <Span>Marca</Span>
            </ContainerInput>

            <ContainerInput>
              <InputForm
                type="number"
                name="quantidade"
                onChange={handleInputChange}
                value={formValues?.quantidade}
                required
              />
              <Span>Quantidade</Span>
            </ContainerInput>

            <Select name="tamanhoId" onChange={onChange} value={formValues?.tamanhoId}>
              <option value="">Selecione o tamanho</option>
              {dataSizes && dataSizes.map(size => <option value={size.id}>{size.descricao}</option>)}
            </Select>

            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {data &&
              data.map(item => (
                <ProductCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateProducts} />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Products;
