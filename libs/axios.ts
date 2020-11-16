import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'api'
})

export default axios
