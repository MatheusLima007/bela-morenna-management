import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import ProductCard from '../../components/ProductsCard';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import { getProducts } from '../../services/api/products';
import { getPurchases } from '../../services/api/Purchases';
import { getSales } from '../../services/api/Sales';
import { listEntitys, listModes, listOrdersProduct, listOrdersPurchase, listOrdersSale } from '../../utils/data';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import { IProductsData } from '../Products';
import { IPurchasesData } from '../Purchases';
import { ISalesData } from '../Sales';
import { Container, Content, ContentList, Filters, Table, Td, Th, Tr } from './styles';
interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: number;
  data: string;
  nomeFornecedor?: string;
  nomeCliente?: string;
  nomeUsuario: string;
  precoTotal: string;
  produtoDescricao: string;
  quantidade: number;
  tamanhoDescricao: string;
}

interface IResponse {
  response?: any;
  error?: any;
}

const Reports: React.FC<IRouteParams> = ({ match }) => {
  const [dataProducts, setDataProducts] = useState<IProductsData[] | null>(null);
  const [dataPurchases, setDataPurchases] = useState<IPurchasesData[] | null>(null);
  const [dataSales, setDataSales] = useState<ISalesData[] | null>(null);
  // const [formattedData, setFormattedData] = useState<IData[]>([]);
  const [entitySelected, setEntitySelected] = useState<string>('produtos');
  const [orderSelected, setOrderSelected] = useState<string>('descricao');
  const [modeSelected, setModeSelected] = useState<string>('asc');

  const orders = useMemo(() => {
    let listOrders = listOrdersProduct;

    if (entitySelected === 'compras') {
      listOrders = listOrdersPurchase;
    }

    if (entitySelected === 'vendas') {
      listOrders = listOrdersSale;
    }

    return listOrders.map(order => {
      return {
        value: order.value,
        label: order.label,
      };
    });
  }, [entitySelected]);

  const entitys = useMemo(() => {
    return listEntitys.map(entity => {
      return {
        value: entity.value,
        label: entity.label,
      };
    });
  }, []);

  const modes = useMemo(() => {
    return listModes.map(mode => {
      return {
        value: mode.value,
        label: mode.label,
      };
    });
  }, []);

  const handleEntitySelected = (entity: string) => {
    try {
      setEntitySelected(entity);
    } catch {
      throw new Error('invalid entity value. Is accept 0 - 24.');
    }
  };

  const handleOrderSelected = (order: string) => {
    try {
      setOrderSelected(order);
    } catch {
      throw new Error('invalid order value. Is accept integer numbers.');
    }
  };

  const handleModeSelected = (mode: string) => {
    try {
      setModeSelected(mode);
    } catch {
      throw new Error('invalid mode value. Is accept integer numbers.');
    }
  };

  const onClick = () => {
    if (entitySelected === 'compras') {
      listPurchases();
    }

    if (entitySelected === 'vendas') {
      listSales();
    }

    if (entitySelected === 'produtos') {
      listProducts();
    }
  };

  const listProducts = async () => {
    const data = `order=${orderSelected ? orderSelected : 'descricao'}&mode=${modeSelected ? modeSelected : 'asc'}`;

    const { error, response }: IResponse = await getProducts(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataPurchases(null);
    setDataSales(null);
    setDataProducts(response?.data);
  };

  const listPurchases = async () => {
    const data = `order=${orderSelected ? orderSelected : 'nomeFornecedor'}&mode=${
      modeSelected ? modeSelected : 'asc'
    }`;

    const { error, response }: IResponse = await getPurchases(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataProducts(null);
    setDataSales(null);
    setDataPurchases(response?.data);
  };

  const listSales = async () => {
    const data = `order=${orderSelected ? orderSelected : 'nomeCliente'}&mode=${modeSelected ? modeSelected : 'asc'}`;

    const { error, response }: IResponse = await getSales(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setDataPurchases(null);
    setDataProducts(null);
    setDataSales(response?.data);
  };

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <Container>
      <ContentHeader title="Relatórios" lineColor="#fff">
        <SelectInput
          options={entitys}
          onChange={e => handleEntitySelected(e.target.value)}
          defaultValue={entitySelected}
        />

        <SelectInput
          options={orders}
          onChange={e => handleOrderSelected(e.target.value)}
          defaultValue={orderSelected}
        />

        <SelectInput options={modes} onChange={e => handleModeSelected(e.target.value)} defaultValue={modeSelected} />

        <Button style={{ marginLeft: '8px', width: '150px' }} onClick={onClick}>
          Buscar
        </Button>
      </ContentHeader>
      <Content>
        <ContentList>
          {dataProducts && (
            <Table>
              <Tr>
                <Th>NOME</Th>
                <Th>TAMANHO</Th>
                <Th>MARCA</Th>
                <Th>QUANTIDADE</Th>
              </Tr>
              {dataProducts.map(item => (
                <Tr>
                  <Td>{item.descricao}</Td>
                  <Td>{item.descricaoTamanho}</Td>
                  <Td>{item.marca}</Td>
                  <Td>{item.quantidade}</Td>
                </Tr>
              ))}
            </Table>
          )}

          {dataPurchases && (
            <Table>
              <Tr>
                <Th>NOME FORNECEDOR</Th>
                <Th>NOME PRODUTO</Th>
                <Th>NOME USUARIO</Th>
                <Th>TAMANHO</Th>
                <Th>PRECO TOTAL</Th>
                <Th>QUANTIDADE</Th>
                <Th>PARCELA</Th>
              </Tr>
              {dataPurchases.map(item => (
                <Tr>
                  <Td>{item.nomeFornecedor}</Td>
                  <Td>{item.produtoDescricao}</Td>
                  <Td>{item.nomeUsuario}</Td>
                  <Td>{item.tamanhoDescricao}</Td>
                  <Td>{item.precoTotal}</Td>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.parcela}</Td>
                </Tr>
              ))}
            </Table>
          )}

          {dataSales && (
            <Table>
              <Tr>
                <Th>NOME CLIENTE</Th>
                <Th>NOME PRODUTO</Th>
                <Th>NOME USUARIO</Th>
                <Th>TAMANHO</Th>
                <Th>PRECO TOTAL</Th>
                <Th>QUANTIDADE</Th>
                <Th>PARCELA</Th>
              </Tr>
              {dataSales.map(item => (
                <Tr>
                  <Td>{item.nomeCliente}</Td>
                  <Td>{item.produtoDescricao}</Td>
                  <Td>{item.nomeUsuario}</Td>
                  <Td>{item.tamanhoDescricao}</Td>
                  <Td>{item.precoTotal}</Td>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.parcela}</Td>
                </Tr>
              ))}
            </Table>
          )}
        </ContentList>
      </Content>
    </Container>
  );
};

export default Reports;
