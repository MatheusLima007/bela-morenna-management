import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getPurchase(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`compras?page=${data}`).then(response => {
      //console.log(`response.data`, response.data)
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getByIdPurchase(id) {
  try {
    return await api.get(`compras/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postPurchase(data) {
  try {
    return await api.post('compras', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putPurchase(data, id) {
  try {
    return await api.put(`compras/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removePurchase(id) {
  try {
    return await api.delete(`compras/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
