import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getPurchases(data) {
  try {
    return await api.get(`produto-compras?${data}`).then(response => {
      //console.log(`response.data`, response.data)
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getByIdPurchases(id) {
  try {
    return await api.get(`produto-compras/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postPurchases(data) {
  try {
    return await api.post('produto-compras', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putPurchases(data, id) {
  try {
    return await api.put(`produto-compras/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removePurchases(id) {
  try {
    return await api.delete(`produto-compras/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
