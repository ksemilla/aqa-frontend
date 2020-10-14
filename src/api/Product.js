import axios from 'axios';

const API_URL = 'http://localhost:8000';

const getTokenAuth = () => {
  let accessToken = localStorage.getItem("token")
  return "JWT " + accessToken
}

const getConfig = () => ({
  headers: {
    'Content-Type':  'application/json',
    Authorization: getTokenAuth()
  }
})

export default class ProductService{

    getAll(){
      const url = `${API_URL}/api/products/`;
      return axios.get(url, getConfig());
    }

    create(data) {
      const url = `${API_URL}/api/products/`;
      return axios.post(url, data, getConfig());
    }

    get(id) {
      const url = `${API_URL}/api/products/${id}/`
      return axios.get(url, getConfig());
    }

    update(data) {
      const url = `${API_URL}/api/products/${data.id}/`
      return axios.put(url, data, getConfig());
    }

    delete(id) {
      const url = `${API_URL}/api/products/${id}/`
      return axios.delete(url, getConfig());
    }

}