const schedule = require('node-schedule');
const axios = require('axios');

const gatewayUrl = `http://app.objco.com:8099/?account=NTB37PKZUG&limit=10`;


/**
* GatewayData class.
*/
class GatewayData {
  /**
  * Constructor.
  * @param {number} id data ID.
  * @param {string} data raw data.
  * @param {string} date data date.
  */
  constructor(id, data, date) {
    this.id = id;
    this.data = data;
    this.date = date;
  }

  /**
  * prints the data to the console.
  */
  log() {
    console.log(`Data number ${this.id}:`);
    console.log(`Data : "${this.data}"`);
    console.log(`Emitted ${this.date}.`);
  }
}

const gatewayDatas = [];

const getData = function() {
  axios.get(gatewayUrl)
      .then(function(response) {
        // handle success
        response.data.forEach((item) => {
          const gatewayData = new GatewayData(item[0], item[1], item[2]);
          gatewayDatas.push(gatewayData);
        });
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

schedule.scheduleJob('*/1 * * * *', getData);
