// modules import
const schedule = require('node-schedule');
const axios = require('axios');
const {Client} = require('pg');
const path = require('path');
const GatewayDataRaw = require('../common/GatewayDataRaw.js');
const GatewayDataDecoder = require('../common/GatewayDataDecoder.js');
// business
const Gateways = require('../business/gateways.js');
const Records = require('../business/records.js');
const Sensors = require('../business/sensors.js');

require('dotenv').config({
  path: path.resolve(path.join(__dirname, '../../.env')),
});

const client = new Client();
const gateways = new Gateways(client);
const records = new Records(client);
const sensors = new Sensors(client);

// configuration file import
const config = require('../config.json');
// const {convertStatusDataLength} = require('../common/GatewayDataDecoder.js');
const gatewayUrl = config.gatewayUrl;

const gatewayDataRawArray = [];
// const gatewayDataDecodedArray = [];

// teste si l'id existe déjà dans le tableau
const checkAlreadyExistingData = function(gatewayDataArray, id) {
  return gatewayDataArray.some((item) => item.id === id);
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
  return gatewayDataRawArray.map((item) => {
    const gatewayDataDecoded = GatewayDataDecoder.decode(item);
    return gatewayDataDecoded;
  });
};

// stocke les données exploitable dans la base de données
const storeConvertedDataIntoDatabase = async function(data) {
  let response = await gateways.getGatewayByImei(parseInt(data.imei));
  let gateway = response.rows[0];


  if (!gateway) {
    await gateways.insertGatewayByImei(parseInt(data.imei));
    response = await gateways.getGatewayByImei(parseInt(data.imei));
    gateway = response.rows[0];
  };

  await gateways.insertGatewayStatus(
      gateway.id,
      data.date,
      data.alarmType,
      data.isConnectedToPower,
      data.batteryVoltage,
      data.powerVoltage,
  );

  for (const tag of data.tags) {
    response = await sensors.getSensorBySerial(tag.id);
    let sensor = response.rows[0];

    if (!sensor) {
      response = await sensors.insertSensorBySerial(
          tag.id,
          gateway.id,
      );
      response = await sensors.getSensorBySerial(tag.id);
      sensor = response.rows[0];
    }

    await records.insertRecords(
        new Date(),
        sensor.id,
        tag.batteryVoltageAlertStatus,
        tag.temperatureAlertStatus,
        tag.abnormalTemperatureStatus,
        tag.humidityAlertStatus,
        tag.batteryVoltage,
        tag.rssi,
        tag.temperature,
        tag.humidity,
    );
  }
};

// fonction générale appelée à chaque accès à la gateway
// appelle tour à tour les fonctions nécessaires au
// décodage puis stockage en base
const processResponse = function(response) {
  storeRawData(response.data);
  const data = convertData();
  data.forEach((item) => {
    storeConvertedDataIntoDatabase(item);
  });
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
  client.connect();

  getData();
  schedule.scheduleJob('*/4 * * * *', getData);
};

// lancement du processus général
main();
