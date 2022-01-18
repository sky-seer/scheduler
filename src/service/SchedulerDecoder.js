// modules import
const schedule = require('node-schedule');
const axios = require('axios');
const GatewayDataRaw = require('../common/GatewayDataRaw.js');
const GatewayDataDecoder = require('../common/GatewayDataDecoder.js');

// configuration file import
const config = require('../config.json');
const gatewayUrl = config.gatewayUrl;

const gatewayDataRawArray = [];
const gatewayDataDecodedArray = [];

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

const getData = function() {
  axios.get(gatewayUrl)
      .then(function(response) {
        // handle success
        console.log('*************');
        console.log('Début du traitement planifié.');
        response.data.forEach((item) => {
          if (!checkAlreadyExistingData(gatewayDataRawArray, item[0])) {
            const gatewayData = new GatewayDataRaw(item[0], item[1], item[2]);
            gatewayDataRawArray.push(gatewayData);
          }
        });
        console.log('Affichage de chaque donnée brute récupérée :');
        gatewayDataRawArray.forEach((item) => {
          item.log();
          console.log('------------');
        });
        console.log('Décodage de chaque donnée brute en donnée.');
        gatewayDataRawArray.forEach((item) => {
          if (!checkAlreadyExistingData(gatewayDataDecodedArray, item.id)) {
            const gatewayDataDecoded = GatewayDataDecoder.decode(item);
            gatewayDataDecodedArray.push(gatewayDataDecoded);
          }
        });
        console.log('Affichage de chaque donnée décodée.');
        gatewayDataDecodedArray.forEach((item) => {
          item.log();
          console.log('------------');
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
};

const main = function() {
  schedule.scheduleJob('*/4 * * * *', getData);
};

main();
