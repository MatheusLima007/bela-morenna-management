import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import PurchasesCard from '../../components/PurchasesCard';
import SelectInput from '../../components/SelectInput';
import { getByIdPurchase, getPurchase, removePurchase } from '../../services/api/Purchase';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { Container, Content, Flex, FlexColumn, H3, Text, ContainerProduct, TextProduct } from './styles';

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
  fornecedorNome: string;
  usuarioNome: string;
  precoTotal: string;
  descricao: string;
}

export interface IDataPurchase {
  id: number;
  data: string;
  fornecedorNome: string;
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

const ListPurchases: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [purchase, setPurchase] = useState<IDataPurchase[]>();

  const [formattedData, setFormattedData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const history = useHistory();
  const purchaseId = match.params.id;

  const purchases = async () => {
    const { error, data }: IResponse = await getPurchase();

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(data as IData[]);
  };

  const purchasesById = async (id: string) => {
    const { error, data }: IResponse = await getByIdPurchase(id);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setPurchase(data as IDataPurchase[]);
  };

  useEffect(() => {
    purchases();
  }, []);

  useEffect(() => {
    if (purchaseId) {
      purchasesById(purchaseId);
    } else {
      setPurchase(null);
    }
  }, [purchaseId]);

  const pageData = useMemo(() => {
    return {
      title: 'Compras',
      lineColor: '#E44C4E',
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

      const formattedData: IData[] = filteredData.map(item => {
        return {
          id: item.id,
          data: formatDate(item.data),
          fornecedorNome: item.fornecedorNome,
          usuarioNome: item.usuarioNome,
          precoTotal: formatCurrency(Number(item.precoTotal)),
          descricao: item.descricao,
        };
      });

      setFormattedData(formattedData);
    }
  }, [data, pageData, monthSelected, yearSelected, data.length]);

  const deleteOrUpdatePurchases = async (data?: IData) => {
    // if (data) {
    //   // setFormValues(data);
    //   // setId(id);
    //   console.log(`atualizar`, data);
    // } else {
    if (window.confirm('Tem certeza que deseja excluir esse Compra?')) {
      console.log(`remover`, data);
      const { error }: IResponse = await removePurchase(data.id);

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
        {!purchase ? (
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
          <Button style={{ width: '200px', marginLeft: '50px' }} onClick={() => history.push('/list/exit-balance')}>
            Voltar
          </Button>
        )}
      </ContentHeader>

      <Content>
        {formattedData && !purchase ? (
          formattedData.map(item => (
            <div onClick={() => history.push(`/list/exit-balance/${item.id}`)}>
              <PurchasesCard key={item.id} tagColor="#05a048" data={item} callback={deleteOrUpdatePurchases} />
            </div>
          ))
        ) : (
          <FlexColumn>
            <Flex>
              <FlexColumn>
                <H3>Fornecedor: {purchase[0].fornecedorNome}</H3>
                <H3>Usuario: {purchase[0].usuarioNome}</H3>
              </FlexColumn>
              <FlexColumn>
                <H3>Preco Total: {formatCurrency(Number(purchase[0].precoTotal))}</H3>
                <H3>Data: {formatDate(purchase[0].data)}</H3>
              </FlexColumn>
            </Flex>
            <FlexColumn>
              <Text>Produtos</Text>
              <FlexColumn>
                <Flex>
                  {purchase.map(purchase => (
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

export default ListPurchases;
