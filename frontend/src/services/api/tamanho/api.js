import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

export async function get(data) {
    try {
        if(data <= 1){
            data = 1
        }
        return await api.get(`tamanhos?page=${data}`).then(response => {
          console.log(`response.data`, response.data)
          return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function getById(id) {
    try {
        return await api.get(`tamanhos/${id}`).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function post(data) {
    try {
        return await api.post('tamanhos', data).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function put(data, id) {
    try {
        return await api.put(`tamanhos/${id}`, data).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function remove(id) {
    try {
        return await api.delete(`tamanhos/${id}`).then(response => {
            return { response: response.data }
        })
    } catch (error) {
        return { error: error.response}
    }
}
