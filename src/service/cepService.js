const cepPromisse  = require('cep-promise');

exports.getCep = async (cep) => {
  try{
    return await cepPromisse(cep);
  }
  catch(e){
    console.log('>>> e',e);

  }
}