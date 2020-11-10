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

export default class UserService{

    getRoles(){
      const url = `${API_URL}/api/users/roles/`;
      return axios.get(url, getConfig());
    }

    getList(){
      const url = `${API_URL}/api/users/`;
      return axios.get(url, getConfig());
    }

    create(data){
      const url = `${API_URL}/api/users/signup/`;
      return axios.post(url, data, getConfig());
    }

    get(id) {
      const url = `${API_URL}/api/users/${id}/`;
      return axios.get(url, getConfig());
    }

    update(data) {
      const url = `${API_URL}/api/users/${data.id}/`;
      return axios.put(url, data, getConfig());
    }
}