import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getSale(data) {
  try {
    return await api.get(`vendas?${data}`).then(response => {
      //console.log(`response.data`, response.data)
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getByIdSale(id) {
  try {
    return await api.get(`vendas/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postSale(data) {
  try {
    return await api.post('vendas', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putSale(data, id) {
  try {
    return await api.put(`vendas/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeSale(id) {
  try {
    return await api.delete(`vendas/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
