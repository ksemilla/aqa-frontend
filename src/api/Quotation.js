import axios from 'axios';
import { get } from 'mobx';

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

export default class QuotationService{

    getAll(){
      const url = `${API_URL}/api/quotations/`;
      return axios.get(url, getConfig());
    }

    create(data) {
      const url = `${API_URL}/api/quotations/`;
      return axios.post(url, data, getConfig());
    }

    get(id) {
      const url = `${API_URL}/api/quotations/${id}/`
      return axios.get(url, getConfig());
    }

    update(data) {
      const url = `${API_URL}/api/quotations/${data.id}/`
      return axios.put(url, data, getConfig());
    }

    delete(id) {
      const url = `${API_URL}/api/quotations/${id}/`
      return axios.delete(url, getConfig());
    }

    getNextList(url) {
      return axios.get(url, getConfig())
    }

}