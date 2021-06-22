import axios from 'axios'

// const token = JSON.parse(localStorage.getItem("token"))
// const AuthStr = `Bearer ${token}`

const api = axios.create({
    baseURL: 'http://localhost:3333',
    //headers: {'Authorization': AuthStr}
})

export default api