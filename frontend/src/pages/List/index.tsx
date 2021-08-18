import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import { getPurchases } from '../../services/api/Purchases';
import { getSales } from '../../services/api/Sales';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';
import { Container, Content, Filters } from './styles';
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

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [formattedData, setFormattedData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const movimentType = match.params.type;

  // const [list, setList] = useState([])
  // const [totalPage, setTotalPage] = useState()

  const sales = async (data?: any) => {
    const { error, response }: IResponse = await getSales(data);

    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response.data);
    //setTotalPage(response.count)
  };

  const purchases = async (data?: any) => {
    const { error, response }: IResponse = await getPurchases(data);
    //console.log(`response`, response);
    if (error) {
      alert('Algo de errado não está certo!');
      return;
    }

    setData(response.data);
    //setTotalPage(response.count)
  };

  useEffect(() => {
    if (movimentType === 'entry-balance') {
      //console.log(`sales`, data);
      sales();
    } else {
      //console.log(`purchases`, data);
      purchases();
    }
  }, [movimentType]);

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? {
          title: 'Vendas',
          lineColor: '#4E41F0',
          data: data,
        }
      : {
          title: 'Compras',
          lineColor: '#E44C4E',
          data: data,
        };
  }, [movimentType, data]);

  //console.log(`formattedData`, formattedData);

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
  }, [pageData, movimentType]);

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

      //console.log(`filteredData`, filteredData);

      const formattedData = filteredData.map(item => {
        if (movimentType !== 'entry-balance') {
          return {
            id: item.id,
            data: formatDate(item.data),
            nomeFornecedor: item.nomeFornecedor,
            nomeUsuario: item.nomeUsuario,
            precoTotal: formatCurrency(Number(item.precoTotal)),
            produtoDescricao: item.produtoDescricao,
            quantidade: item.quantidade,
            tamanhoDescricao: item.tamanhoDescricao,
          };
        } else {
          return {
            id: item.id,
            data: formatDate(item.data),
            nomeCliente: item.nomeCliente,
            nomeUsuario: item.nomeUsuario,
            precoTotal: formatCurrency(Number(item.precoTotal)),
            produtoDescricao: item.produtoDescricao,
            quantidade: item.quantidade,
            tamanhoDescricao: item.tamanhoDescricao,
          };
        }
      });

      setFormattedData(formattedData);
    }
  }, [data, pageData, monthSelected, yearSelected, data.length]);
  console.log(`formattedData`, formattedData);
  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          onChange={e => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput options={years} onChange={e => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Content>
        {movimentType !== 'entry-balance'
          ? formattedData.map(item => (
              <HistoryFinanceCard
                key={item.id}
                tagColor="#E44C4E"
                title={`Produto: ${item.produtoDescricao}`}
                subtitle={`Fornecedor: ${item.nomeFornecedor} - Usuario: ${item.nomeUsuario}`}
                amount={item.precoTotal}
              />
            ))
          : formattedData.map(item => (
              <HistoryFinanceCard
                key={item.id}
                tagColor="#4E41F0"
                title={`Produto: ${item.produtoDescricao}`}
                subtitle={`Cliente: ${item.nomeCliente} - Usuario: ${item.nomeUsuario}`}
                amount={item.precoTotal}
              />
            ))}
      </Content>
    </Container>
  );
};

export default List;
