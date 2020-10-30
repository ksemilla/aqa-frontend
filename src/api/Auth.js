import axios from 'axios';

const API_URL = 'http://localhost:8000';

export class AuthService{
	verifyToken(token){
		let data = {token: token}
		const url = `${API_URL}/api/token/verify/`;
		return axios.post(url, data)
	}

  refreshToken(token){
    let data = {refresh: token}
		const url = `${API_URL}/api/token/refresh/`;
		return axios.post(url, data);
  }

}

export class LoginService{
    logIn(data){
        const url = `${API_URL}/api/token/`;
        return axios.post(url, data);
    }
}

export class SignupService{

    signup(data){
      const url = `${API_URL}/api/users/signup/`;
      return axios.post(url, data);
    }

}