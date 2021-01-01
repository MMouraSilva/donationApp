const axios = require('axios');
const {urlApi} = require('./../../environment');


exports.getAllCategory = async () => {
  try{
    return axios.get(`${urlApi}/category`);
  }
  catch(e){
    console.log(e)
  }
}

/**
 * @param {category} category The date
 */
exports.createCategory = async (category) => {
  try{
    return axios.post(`${urlApi}/category`,category);
  }
  catch(e){
    console.log(e)
  }
}

const category = {
  name : String,
}