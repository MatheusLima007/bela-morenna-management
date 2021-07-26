import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export async function getUsers(data) {
  try {
    if (data <= 1) {
      data = 1;
    }
    return await api.get(`usuarios?page=${data}`).then(response => {
      console.log(`response.data`, response.data);
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function getUsersById(id) {
  try {
    return await api.get(`usuarios/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postUsers(data) {
  try {
    return await api.post('usuarios', data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putUsers(data, id) {
  try {
    return await api.put(`usuarios/${id}`, data).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function removeUsers(id) {
  try {
    return await api.delete(`usuarios/${id}`).then(response => {
      return { response: response.data };
    });
  } catch (error) {
    return { error: error.response };
  }
}
