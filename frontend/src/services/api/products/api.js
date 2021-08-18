import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getProducts(data) {
  try {
    return await api.get(`produtos?${data}`).then(response => {
      console.log(`response.data`, response.data);
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getProductsById(id) {
  try {
    return await api.get(`produtos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postProducts(data) {
  try {
    return await api.post('produtos', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putProducts(data, id) {
  try {
    return await api.put(`produtos/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeProducts(id) {
  try {
    return await api.delete(`produtos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
