import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getSales(data) {
  try {
    return await api.get(`produto-vendas?${data}`).then(response => {
      //console.log(`response.data`, response.data)
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getByIdSales(id) {
  try {
    return await api.get(`produto-vendas/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postSales(data) {
  try {
    return await api.post('produto-vendas', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putSales(data, id) {
  try {
    return await api.put(`produto-vendas/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeSales(id) {
  try {
    return await api.delete(`produto-vendas/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
