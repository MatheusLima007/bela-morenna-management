import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getPayments(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`tipo_pagamentos?page=${data}`).then(response => {
      console.log(`response.data`, response.data);
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getPaymentsById(id) {
  try {
    return await api.get(`tipo_pagamentos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postPayments(data) {
  try {
    return await api.post('tipo_pagamentos', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putPayments(data, id) {
  try {
    return await api.put(`tipo_pagamentos/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removePayments(id) {
  try {
    return await api.delete(`tipo_pagamentos/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
