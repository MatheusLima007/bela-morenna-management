import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getProviders(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`fornecedores?page=${data}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getProvidersById(id) {
  try {
    return await api.get(`fornecedores/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postProviders(data) {
  try {
    return await api.post('fornecedores', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putProviders(data, id) {
  try {
    return await api.put(`fornecedores/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeProviders(id) {
  try {
    return await api.delete(`fornecedores/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
