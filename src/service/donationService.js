const axios = require('axios');
const {urlApi} = require('./../../environment');


exports.getDonations = async () => {
  try{
    return axios.get(`${urlApi}/donation`);
  }
  catch(e){
    console.log(e)
  }
}

/**
 * @param {donation} donation The date
 */
exports.createDonation = async (donation) => {
  try{
    return axios.post(`${urlApi}/donation`,donation);
  }
  catch(e){
    console.log(e)
  }
}

exports.getDonation = async (donationId) => {
  try{
    return axios.get(`${urlApi}/donation/${donationId}`);
  }
  catch(e){
    console.log(e)
  }
}

exports.updateDonation = async (donation) => {
  try{
    return axios.update(`${urlApi}/donation/${donation.id}`,donation);
  }
  catch(e){
    console.log(e)
  }
}

exports.deleteDonation = async (donationId) => {
  try{
    return axios.delete(`${urlApi}/donation/${donationId}`);
  }
  catch(e){
    console.log(e)
  }
}