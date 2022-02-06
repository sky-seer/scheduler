require('dotenv').config();
// modules import
const schedule = require('node-schedule');
const axios = require('axios');
const {Client} = require('pg');
const GatewayDataRaw = require('../common/GatewayDataRaw.js');
const GatewayDataDecoder = require('../common/GatewayDataDecoder.js');
const Utils = require('./../common/Utils.js');

const client = new Client();
const utils = new Utils(client);

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
  axios.get(`http://app.objco.com:8099/?account=${process.env.TOKEN}&limit=10`)
      .then(async function(response) {
        let gatewayId;

        // Check if gateway exist in database
        let gateway = await utils.getGatewayByHost(
            response.request.host, 'id');

        if (gateway.rowCount === 0) {
          await utils.insertGateway(response.request.host);
          gateway = await utils.getGatewayByHost(
              response.request.host, 'id');
        };

        gatewayId = gateway.rows[0].id;

        // handle success
        console.log('*************');
        console.log('Début du traitement planifié.');
        for (const item of response.data) {
          if (!checkAlreadyExistingData(gatewayDataRawArray, item[0])) {
            const gatewayData = new GatewayDataRaw(item[0], item[1], item[2]);
            gatewayDataRawArray.push(gatewayData);
          }
        };
        console.log('Affichage de chaque donnée brute récupérée :');
        for (const item of gatewayDataRawArray) {
          item.log();
          console.log('------------');
        };
        console.log('Décodage de chaque donnée brute en donnée.');
        for (const item of gatewayDataRawArray) {
          if (!checkAlreadyExistingData(gatewayDataDecodedArray, item.id)) {
            const gatewayDataDecoded = GatewayDataDecoder.decode(item);
            gatewayDataDecodedArray.push(gatewayDataDecoded);
          }
        };
        console.log('Affichage de chaque donnée décodée.');
        for (const item of gatewayDataDecodedArray) {
          item.log();
          console.log('------------');

          const sensor = await utils.getSensorByImei(item.imei, 'id')
              .then(async (result) => {
                if (result.rowCount === 0) {
                  await utils.insertSensor(
                      item.imei,
                      gatewayId,
                      null,
                      item.protocolType,
                      item.hardwareType,
                      item.batteryVoltage,
                  );

                  return await utils.getSensorByImei(item.imei, 'id');
                }

                return result;
              });

          const sensorId = sensor.rows[0].id;

          await utils.insertRecord(
            sensorId,
            item.powerVoltage,
            ''
        };
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
};

const main = async function() {
  await client.connect()
      .then(() => console.log('Connected to PostgreSQL database.'));

  await utils.getRecords()
      .then((res) => {
        res.forEach((item) => gatewayDataRawArray.push(item));
      });

  // schedule.scheduleJob('*/1 * * * *', getData);
  getData();
};

main();
