import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import SalesCard from '../../components/SalesCard';
import SelectInput from '../../components/SelectInput';
import { getByIdSale, getSale, removeSale } from '../../services/api/Sale';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { ISalesData } from '../Sales';
import { Container, ContainerProduct, Content, Flex, FlexColumn, H3, Text, TextProduct } from './styles';

interface IRouteParams {
  match: {
    params: {
      id: string;
    };
  };
}

export interface IData {
  id: number;
  data: string;
  clienteNome: string;
  usuarioNome: string;
  precoTotal: string;
  descricao: string;
}

interface IDataSale {
  id: number;
  data: string;
  clienteNome: string;
  usuarioNome: string;
  precoTotal: string;
  quantidade: number;
  produto: string;
  marca: string;
  tamanho: string;
}

interface IResponse {
  data?: any;
  error?: any;
}

const ListSales: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [sale, setSale] = useState<IDataSale[]>();

  const [formattedData, setFormattedData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const history = useHistory();
  const saleId = match.params.id;

  const sales = async () => {
    const { error, data }: IResponse = await getSale();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(data as IData[]);
  };

  const salesById = async (id?: string) => {
    const { error, data }: IResponse = await getByIdSale(id);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setSale(data as IDataSale[]);
  };

  useEffect(() => {
    sales();
  }, []);

  useEffect(() => {
    if (saleId) {
      salesById(saleId);
    } else {
      setSale(null);
    }
  }, [saleId]);

  const pageData = useMemo(() => {
    return {
      title: 'Vendas',
      lineColor: '#4E41F0',
      data: data,
    };
  }, [data]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;

    data.forEach(item => {
      const date = new Date(item.data);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      };
    });
  }, [pageData]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('invalid year value. Is accept integer numbers.');
    }
  };

  useEffect(() => {
    if (data) {
      const { data } = pageData;

      const filteredData = data.filter(item => {
        const date = new Date(item.data);

        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (monthSelected === 13) {
          return year === yearSelected;
        } else {
          return month === monthSelected && year === yearSelected;
        }
      });
      console.log(`filteredData`, filteredData)
      const formattedData: IData[] = filteredData.map(item => {
        return {
          id: item.id,
          data: formatDate(item.data),
          clienteNome: item.clienteNome,
          usuarioNome: item.usuarioNome,
          precoTotal: formatCurrency(Number(item.precoTotal)),
          descricao: item.descricao,
        };
      });

      setFormattedData(formattedData);
    }
  }, [data, pageData, monthSelected, yearSelected, data.length]);

  const deleteOrUpdateSales = async (data?: IData) => {
    // if (data) {
    // setFormValues(data);
    // setId(id);
    //   console.log(`atualizar`, data);
    // } else {
    if (window.confirm('Tem certeza que deseja excluir essa Venda?')) {
      console.log(`remover`, data);
      const { error }: IResponse = await removeSale(data.id);

      if (error) {
        alert(error.data);
        return;
      }

      // listPurchases();
      // listProviders();
      // listProducts();
      // listSize();
      // listPayments();
    }
    // }
  };

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        {!sale ? (
          <>
            <SelectInput
              options={months}
              onChange={e => handleMonthSelected(e.target.value)}
              defaultValue={monthSelected}
            />
            <SelectInput
              options={years}
              onChange={e => handleYearSelected(e.target.value)}
              defaultValue={yearSelected}
            />
          </>
        ) : (
          <Button style={{ width: '200px', marginLeft: '50px' }} onClick={() => history.push('/list/entry-balance')}>
            Voltar
          </Button>
        )}
      </ContentHeader>

      <Content>
        {formattedData && !sale ? (
          formattedData.map(item => (
            <div onClick={() => history.push(`/list/entry-balance/${item.id}`)}>
              <SalesCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdateSales} />
            </div>
          ))
        ) : (
          <FlexColumn>
            <Flex>
              <FlexColumn>
                <H3>Cliente: {sale[0].clienteNome}</H3>
                <H3>Usuario: {sale[0].usuarioNome}</H3>
              </FlexColumn>
              <FlexColumn>
                <H3>Preco Total: {formatCurrency(Number(sale[0].precoTotal))}</H3>
                <H3>Data: {formatDate(sale[0].data)}</H3>
              </FlexColumn>
            </Flex>
            <FlexColumn>
              <Text>Produtos</Text>
              <FlexColumn>
                <Flex>
                  {sale.map(purchase => (
                    <ContainerProduct>
                      <TextProduct>
                        Produto: {purchase.produto} - Tamanho: {purchase.tamanho}
                      </TextProduct>
                      <TextProduct>
                        Marca: {purchase.marca} - Quantidade: {purchase.quantidade}
                      </TextProduct>
                    </ContainerProduct>
                  ))}
                </Flex>
              </FlexColumn>
            </FlexColumn>
          </FlexColumn>
        )}
      </Content>
    </Container>
  );
};

export default ListSales;
