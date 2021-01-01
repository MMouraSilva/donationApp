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

exports.getAllUser = async () => {
  try{
    return axios.get(`${urlApi}/user`);
  }
  catch(e){
    console.log(e)
  }
}

exports.getUserById = async (userId) => {
  try{
    return axios.get(`${urlApi}/user/${userId}`);
  }
  catch(e){
    console.log(e)
  }
}

/**
 * @param {codeIsvalid} user The date
 */
exports.updateUser = async (user) => {
  try{
    return axios.put(`${urlApi}/user/${user.id}`,user);
  }
  catch(e){
    console.log(e)
  }
}

exports.deleteUser = async (userId) => {
  try{
    return axios.post(`${urlApi}/user/${userId}`);
  }
  catch(e){
    console.log(e)
  }
}

/**
 * @param {confirmEmail} user The date
 */
exports.confirmEmail = async (user) => {
  try{
    return axios.post(`${urlApi}/user/confirm-email`,user);
  }
  catch(e){
    console.log(e)
  }
}

/**
 * @param {codeIsvalid} user The date
 */
exports.codeIsValid = async (user) => {
  try{
    return axios.post(`${urlApi}/user/code-is-valid`,user);
  }
  catch(e){
    console.log(e)
  }
}

const codeIsvalid = {
  id : String,
  code : String
}

const confirmEmail = {
  id : String
}