import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

export async function get(data) {
    try {
        if(data <= 1){
            data = 1
        }
        return await api.get(`produto-compras?page=${data}`).then(response => {
          //console.log(`response.data`, response.data)
          return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function getById(id) {
    try {
        return await api.get(`produto-compras/${id}`).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function post(data) {
    try {
        return await api.post('produto-compras', data).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function put(data, id) {
    try {
        return await api.put(`produto-compras/${id}`, data).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function remove(id) {
    try {
        return await api.delete(`produto-compras/${id}`).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}
