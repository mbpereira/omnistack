import axios from 'axios'

const baseURL = 'http://192.168.0.32:4000'

export default axios.create({
    baseURL
})

export { baseURL }