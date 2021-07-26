import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getCustomers(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`clientes?page=${data}`).then(response => {
      console.log(`response.data`, response.data);
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getCustomersById(id) {
  try {
    return await api.get(`clientes/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postCustomers(data) {
  try {
    return await api.post('clientes', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putCustomers(data, id) {
  try {
    return await api.put(`clientes/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeCustomers(id) {
  try {
    return await api.delete(`clientes/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
