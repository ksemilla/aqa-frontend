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
}