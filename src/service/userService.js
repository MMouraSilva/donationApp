const axios = require('axios');
const {urlApi} = require('./../../environment');

console.log(urlApi)

exports.login =  (user) => {
  try{
    return axios.post(`${urlApi}/user/login`,user);
  }
  catch(e){
    console.log(e)
  }
}

exports.create = async (user) => {
  try{
    return axios.post(`${urlApi}/user`,user);
  }
  catch(e){
    console.log(e)
  }
}