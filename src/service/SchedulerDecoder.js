// modules import
const schedule = require('node-schedule');
const axios = require('axios');
const GatewayDataRaw = require('../common/GatewayDataRaw.js');
const GatewayDataDecoder = require('../common/GatewayDataDecoder.js');

// configuration file import
const config = require('../config.json');
const { convertStatusDataLength } = require('../common/GatewayDataDecoder.js');
const gatewayUrl = config.gatewayUrl;

const gatewayDataRawArray = [];
const gatewayDataDecodedArray = [];

// teste si l'id existe déjà dans le tableau
const checkAlreadyExistingData = function(gatewayDataArray, id) {
  let i = 0;
  while (i < gatewayDataArray.length) {
    if (gatewayDataArray[i].id === id) {
      return true;
    }
    i++;
  }
  return false;
};

// stocke les données de la gateway dans un tableau
const storeRawData = function(data) {
  data.forEach((item) => {
    if (!checkAlreadyExistingData(gatewayDataRawArray, item[0])) {
      const gatewayData = new GatewayDataRaw(item[0], item[1], item[2]);
      gatewayDataRawArray.push(gatewayData);
    }
  });
};

// convertit les données brutes en données exploitables
const convertData = function() {
  gatewayDataRawArray.forEach((item) => {
    if (!checkAlreadyExistingData(gatewayDataDecodedArray, item.id)) {
      const gatewayDataDecoded = GatewayDataDecoder.decode(item);
      gatewayDataDecodedArray.push(gatewayDataDecoded);
    }
  });
};

// stocke les données exploitable dans la base de données
const storeConvertedDataIntoDatabase = function() {

};

// fonction générale appelée à chaque accès à la gateway
// appelle tour à tour les fonctions nécessaires au
// décodage puis stockage en base
const processResponse = function(response) {
  storeRawData(response.data);
  convertData();
  storeConvertedDataIntoDatabase();
};

// requête et réponse de la gateway
const getData = function() {
  axios.get(gatewayUrl)
      .then(processResponse)
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {});
};

// planifie l'accès régulier à la gateway
const main = function() {
  schedule.scheduleJob('*/4 * * * *', getData);
};

// lancement du processus général
main();
