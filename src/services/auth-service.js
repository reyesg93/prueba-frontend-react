import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const registro = (user) => {
  return axios.post(API_URL + 'registro', {
    nombre: user.nombre,
    correo: user.correo,
    password: user.password
  });
};

const login = (user) => {
  return axios.post(API_URL + 'login', {
    correo: user.correo,
    password: user.password
  }).then((res) => {

    if (res.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    //console.log(localStorage.getItem('user'));
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getInfoUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};


export default {
  registro,
  login,
  logout,
  getInfoUser
}
