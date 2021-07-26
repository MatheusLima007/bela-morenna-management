import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getAddress(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`enderecos?page=${data}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getAddressById(id) {
  try {
    return await api.get(`enderecos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postAddress(data) {
  try {
    return await api.post('enderecos', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putAddress(data, id) {
  try {
    return await api.put(`enderecos/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeAddress(id) {
  try {
    return await api.delete(`enderecos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
