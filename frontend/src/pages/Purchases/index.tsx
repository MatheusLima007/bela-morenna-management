import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import MediumCard from '../../components/MediumCard';
import ProductListCard from '../../components/ProductListCard';
import PurchasesCard from '../../components/PurchasesCard';
import { postPayments, putPayments } from '../../services/api/payments';
import { getProducts } from '../../services/api/products';
import { getProviders } from '../../services/api/providers';
import { postPurchase, putPurchase } from '../../services/api/Purchase';
import { getPurchases, postPurchases, putPurchases, removePurchases } from '../../services/api/Purchases';
import { getSize } from '../../services/api/size';
import { getTypePayments } from '../../services/api/type-payments';
import { IProductsData } from '../Products';
import { IProvidersData } from '../Providers';
import { IDataSize } from '../Sizes';
import {
  Container,
  ContainerInput,
  Content,
  ContentForm,
  ContentList,
  Flex,
  FlexContainer,
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

export interface IPurchasesData {
  id?: number;
  quantidade: number;
  fornecedorId: number;
  usuarioId: number;
  pagamentoId: number;

  produtoId: number;
  tamanhoId: number;
  compraId: number;

  precoTotal: number | string;
  parcela: number;
  tipoPagamentoId: number;

  produtoDescricao?: string;
  tamanhoDescricao?: string;
  data?: string;
  nomeFornecedor?: string;
  nomeUsuario?: string;
}

export interface ISelectedProducts {
  produtoId?: string;
  produtoName?: string;
  tamanhoId?: string;
  tamanhoName?: string;
  quantidade?: string;
}

const Purchases: React.FC<IRouteParams> = () => {
  const [formValues, setFormValues] = useState<IPurchasesData | null>();
  const [data, setData] = useState<IPurchasesData[]>([]);
  const [dataProviders, setDataProviders] = useState<IProvidersData[]>([]);
  const [dataProducts, setDataProducts] = useState<IProductsData[]>([]);
  const [dataSizes, setDataSizes] = useState<IDataSize[]>([]);
  const [dataTypePayments, setDataTypePayments] = useState<IDataSize[]>([]);
  const [id, setId] = useState<number>();

  const [productId, setProductId] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts[]>([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      alert('Selecione pelo menos um prduto para continuar!');
      return;
    }

    const dataPayments = {
      precoTotal: formValues.precoTotal,
      parcela: formValues.parcela,
      tipoPagamentoId: formValues.tipoPagamentoId,
    };

    if (id) {
      await putPayments(dataPayments, formValues?.pagamentoId)
        .then(async (data: IResponse) => {
          const dataPurchase = {
            fornecedorId: formValues.fornecedorId,
            usuarioId: formValues.usuarioId,
            pagamentoId: data.response.id,
          };

          await putPurchase(dataPurchase, formValues?.compraId)
            .then(async (data: IResponse) => {
              const dataPurchases = {
                quantidade: formValues.quantidade,
                produtoId: formValues.produtoId,
                tamanhoId: formValues.tamanhoId,
                compraId: data.response.id,
              };

              const { error, response }: IResponse = await putPurchases(dataPurchases, id);
              if (error) {
                alert(error.data);
                return;
              }

              alert(`Compra atualizada com sucesso`);
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
          const dataPurchase = {
            fornecedorId: formValues.fornecedorId,
            usuarioId: 2,
            pagamentoId: data.response.id,
          };

          await postPurchase(dataPurchase)
            .then(async (data: IResponse) => {
              await selectedProducts.forEach(selectedProduct => {
                const dataPurchases = {
                  quantidade: selectedProduct.quantidade,
                  produtoId: selectedProduct.produtoId,
                  tamanhoId: selectedProduct.tamanhoId,
                  compraId: data.response.id,
                };

                postPurchases(dataPurchases).then(() => {
                  setSelectedProducts(selectedProducts =>
                    selectedProducts.filter(
                      selectedProducts => selectedProducts.produtoId !== selectedProduct.produtoId,
                    ),
                  );
                });
              });
              // const { error, response }: IResponse = await postPurchases(dataPurchases);

              // if (error) {
              //   alert(error.data);
              //   return;
              // }

              alert(`Compra criada com sucesso`);
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
      fornecedorId: null,
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
    listPurchases();
    listProviders();
    listProducts();
    listSize();
    listPayments();
  };

  const listPurchases = async (data?: any) => {
    const { error, response }: IResponse = await getPurchases(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response?.data);
  };

  const listProviders = async (data?: any) => {
    const { error, response }: IResponse = await getProviders();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataProviders(response?.data);
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

  const removeProduct = async (data?: ISelectedProducts) => {
    if (window.confirm('Tem certeza que deseja excluir esse Produto?')) {
      setSelectedProducts(selectedProducts =>
        selectedProducts.filter(selectedProducts => selectedProducts.produtoId !== data.produtoId),
      );
    }
  };

  useEffect(() => {
    listPurchases();
    listProviders();
    listProducts();
    listSize();
    listPayments();
  }, []);

  const onChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const setProducts = () => {
    if (selectedProducts.filter(selectedProducts => selectedProducts.produtoId === productId).length >= 1) {
      alert('Produto ja selecionado!');
      return;
    }

    const tamanhoIdProduct = dataProducts.filter(product => product.id.toString() === productId)[0];

    setSelectedProducts(selectedProducts => [
      ...selectedProducts,
      {
        produtoId: productId,
        produtoName: tamanhoIdProduct.descricao,
        tamanhoId: tamanhoIdProduct.tamanhoId.toString(),
        tamanhoName: tamanhoIdProduct.descricaoTamanho,
        quantidade: productQuantity,
      },
    ]);

    setProductId('');
    setProductQuantity('');
  };

  console.log(`selectedProducts`, selectedProducts);
  return (
    <Container>
      <ContentHeader title="Compras" lineColor="#4E41F0">
        {' '}
      </ContentHeader>

      <Content>
        <ContentForm>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Realizar Compra</FormTitle>
            <Select name="fornecedorId" onChange={onChange} value={formValues?.fornecedorId}>
              <option value="">Selecione o Fornecedor</option>
              {dataProviders && dataProviders.map(provider => <option value={provider.id}>{provider.nome}</option>)}
            </Select>
            {/* <Select name="tamanhoId" onChange={onChange} value={formValues?.tamanhoId}>
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
                  name="parcela"
                  onChange={handleInputChange}
                  value={formValues?.parcela}
                  required
                />
                <Span>Parcela</Span>
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
            Selecione o Produto
            <FlexContainer>
              <Select name="produtoId" onChange={event => setProductId(event.target.value)} value={productId}>
                <option value="">Selecione o Produto</option>
                {dataProducts &&
                  dataProducts.map(product => (
                    <option value={product.id}>
                      {product.descricao} - {product.descricaoTamanho}
                    </option>
                  ))}
              </Select>

              <ContainerInput>
                <InputForm
                  type="number"
                  name="quantidade"
                  onChange={event => setProductQuantity(event.target.value)}
                  value={productQuantity}
                />
                <Span>Quantidade</Span>
              </ContainerInput>

              <Button style={{ width: '150px', height: '40px', margin: '0' }} type="button" onClick={setProducts}>
                Salvar Produto
              </Button>
            </FlexContainer>
            <Button type="submit">Enviar</Button>
          </Form>
        </ContentForm>
        <ContentList>
          <List>
            {selectedProducts &&
              selectedProducts.map(selectedProducts => (
                <ProductListCard
                  key={selectedProducts.produtoId}
                  tagColor="#05a048"
                  data={selectedProducts}
                  callback={removeProduct}
                />
              ))}
          </List>
        </ContentList>
      </Content>
    </Container>
  );
};

export default Purchases;
