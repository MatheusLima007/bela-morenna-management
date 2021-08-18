import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import MediumCard from '../../components/MediumCard';
import PurchasesCard from '../../components/PurchasesCard';
import SalesCard from '../../components/SalesCard';
import { getCustomers } from '../../services/api/customers';
import { postPayments, putPayments } from '../../services/api/payments';
import { getProducts } from '../../services/api/products';
import { postPurchase, putPurchase } from '../../services/api/Purchase';
import { postSale, putSale } from '../../services/api/Sale';
import { getSales, postSales, putSales, removeSales } from '../../services/api/Sales';
import { getSize } from '../../services/api/size';
import { getTypePayments } from '../../services/api/type-payments';
import { ICustomersData } from '../Customers';
import { IProductsData } from '../Products';
import { IDataSize } from '../Sizes';
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

export interface ISalesData {
  id?: number;
  quantidade: number;
  clienteId: number;
  usuarioId: number;
  pagamentoId: number;

  produtoId: number;
  tamanhoId: number;
  compraId: number;

  precoTotal: number;
  parcela: number;
  tipoPagamentoId: number;

  produtoDescricao?: string;
  tamanhoDescricao?: string;
  data?: string;
  nomeCliente?: string;
  nomeUsuario?: string;
}

const Sales: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<ISalesData | null>();
  const [data, setData] = useState<ISalesData[]>([]);
  const [dataCustomers, setDataCustomers] = useState<ICustomersData[]>([]);
  const [dataProducts, setDataProducts] = useState<IProductsData[]>([]);
  const [dataSizes, setDataSizes] = useState<IDataSize[]>([]);
  const [dataTypePayments, setDataTypePayments] = useState<IDataSize[]>([]);
  const [id, setId] = useState<number>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`e`, e);

    const dataPayments = {
      precoTotal: formValues.precoTotal,
      parcela: formValues.parcela,
      tipoPagamentoId: formValues.tipoPagamentoId,
    };

    if (id) {
      await putPayments(dataPayments)
        .then(async (data: IResponse) => {
          const dataSale = {
            clienteId: formValues.clienteId,
            usuarioId: formValues.usuarioId,
            pagamentoId: data.response.id,
          };

          await putSale(dataSale)
            .then(async (data: IResponse) => {
              const dataSales = {
                quantidade: formValues.quantidade,
                produtoId: formValues.produtoId,
                tamanhoId: formValues.tamanhoId,
                compraId: data.response.id,
              };

              const { error, response }: IResponse = await putSales(dataSales);
              if (error) {
                alert(error.data);
                return;
              }

              alert(`Venda atualizada com sucesso`);
            })
            .catch(error => {
              console.log(`err`, error.data);
            });
        })
        .catch(error => {
          console.log(`err`, error.data);
        });
    } else {
      await postPayments(dataPayments)
        .then(async (data: IResponse) => {
          const dataSale = {
            clienteId: formValues.clienteId,
            usuarioId: 2,
            pagamentoId: data.response.id,
          };

          await postSale(dataSale)
            .then(async (data: IResponse) => {
              const dataSales = {
                quantidade: formValues.quantidade,
                produtoId: formValues.produtoId,
                tamanhoId: formValues.tamanhoId,
                vendaId: data.response.id,
              };

              const { error, response }: IResponse = await postSales(dataSales);
              if (error) {
                alert(error.data);
                return;
              }

              alert(`Venda criada com sucesso`);
            })
            .catch(error => {
              console.log(`err`, error.data);
            });
        })
        .catch(error => {
          console.log(`err`, error.data);
        });
    }

    setFormValues({
      id: null,
      quantidade: null,
      clienteId: null,
      usuarioId: null,
      pagamentoId: null,

      produtoId: null,
      tamanhoId: null,
      compraId: null,

      precoTotal: null,
      parcela: null,
      tipoPagamentoId: null,
    });
    setId(0);
    listSales();
    listCustomers();
    listProducts();
    listSize();
    listPayments();
  };

  const listSales = async (data?: any) => {
    const { error, response }: IResponse = await getSales(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const listCustomers = async (data?: any) => {
    const { error, response }: IResponse = await getCustomers();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataCustomers(response?.data);
  };

  const listProducts = async (data?: any) => {
    const { error, response }: IResponse = await getProducts();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataProducts(response?.data);
  };

  const listSize = async (data?: any) => {
    const { error, response }: IResponse = await getSize();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataSizes(response.data);
  };

  const listPayments = async (data?: any) => {
    const { error, response }: IResponse = await getTypePayments();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataTypePayments(response.data);
  };

  const deleteOrUpdateSales = async (id?: number, data?: ISalesData) => {
    if (data) {
      setFormValues(data);
      setId(id);
    } else {
      if (window.confirm('Tem certeza que deseja excluir essa Venda?')) {
        const { error }: IResponse = await removeSales(id);

        if (error) {
          alert(error.data);
          return;
        }

        listSales();
        listCustomers();
        listProducts();
        listSize();
        listPayments();
      }
    }
  };

  useEffect(() => {
    listSales();
    listCustomers();
    listProducts();
    listSize();
    listPayments();
  }, []);

  const onChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (formValues?.produtoId) {
      const tamanhoIdProduct = dataProducts.filter(product => product.id == formValues.produtoId)[0];

      setFormValues({ ...formValues, tamanhoId: tamanhoIdProduct?.tamanhoId });
    }
  }, [formValues?.produtoId]);

  return (
    <Container>
      <ContentHeader title="Vendas" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Realizar Venda</FormTitle>

            <Select name="clienteId" onChange={onChange} value={formValues?.clienteId}>
              <option value="">Selecione o Cliente</option>
              {dataCustomers && dataCustomers.map(provider => <option value={provider.id}>{provider.nome}</option>)}
            </Select>

            <Select name="produtoId" onChange={onChange} value={formValues?.produtoId}>
              <option value="">Selecione o Produto</option>
              {dataProducts &&
                dataProducts.map(product => (
                  <option value={product.id}>
                    {product.descricao} - {product.descricaoTamanho}
                  </option>
                ))}
            </Select>

            {/* <Select placeholder="selecione">
              <option value="">Selecione o Tamanho</option>
              {dataSizes && dataSizes.map(size => <option value={size.id}>{size.descricao}</option>)}
            </Select> */}

            <Select name="tipoPagamentoId" onChange={onChange} value={formValues?.tipoPagamentoId}>
              <option value="">Selecione o Tipo de Pagamento</option>
              {dataTypePayments &&
                dataTypePayments.map(typePayments => <option value={typePayments.id}>{typePayments.descricao}</option>)}
            </Select>

            <Flex>
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

              <ContainerInput>
                <InputForm
                  type="number"
                  name="precoTotal"
                  onChange={handleInputChange}
                  value={formValues?.precoTotal}
                  required
                />
                <Span>Preço total</Span>
              </ContainerInput>
            </Flex>

            <ContainerInput>
              <InputForm
                type="number"
                name="parcela"
                onChange={handleInputChange}
                value={formValues?.parcela}
                required
              />
              <Span>Parcela</Span>
            </ContainerInput>

            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {data &&
              data.map(item => (
                <SalesCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateSales} />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Sales;
