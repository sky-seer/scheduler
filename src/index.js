// modules import
const schedule = require('node-schedule');
const axios = require('axios');

// configuration file import
const config = require('./config.json');
const gatewayUrl = config.gatewayUrl;




const checkAlreadyExistingData = function(id) {
  let i = 0;
  while (i < gatewayDatas.length) {
    if (gatewayDatas[i].id === id) {
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
        response.data.forEach((item) => {
          if (!checkAlreadyExistingData(item[0])) {
            const gatewayData = new GatewayRawData(item[0], item[1], item[2]);
            gatewayDatas.push(gatewayData);
          }
        });
        console.log('------------------------------');
        gatewayDatas.forEach((item) => {
          item.log();
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

const main = function () {
  schedule.scheduleJob('*/1 * * * *', getData);
}

const gatewayDatas = [];
