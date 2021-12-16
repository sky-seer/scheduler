const schedule = require('node-schedule');
const axios = require('axios');

const gatewayUrl = `http://app.objco.com:8099/?account=NTB37PKZUG&limit=10`;

const getData = function() {
  axios.get(gatewayUrl)
      .then(function(response) {
        // handle success
        response.data.forEach((item) => {
          console.log(item);
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
