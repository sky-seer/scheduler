/**
 * Business Records
 */
class Records {
  /**
   * @param {Client} client - Postgres client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @param {Date} time
   * @param {number} sensorId
   * @param {boolean} batteryVoltageAlert
   * @param {boolean} temperatureAlert
   * @param {boolean} abnormalTemperatureAlert
   * @param {boolean} humidityAlert
   * @param {number} batteryVoltage
   * @param {number} rssi
   * @param {number} temperature
   * @param {number} humidity
   * @return {Promise<*>}
   */
  async insertRecords(
      time, sensorId, batteryVoltageAlert, temperatureAlert,
      abnormalTemperatureAlert, humidityAlert, batteryVoltage,
      rssi, temperature, humidity,
  ) {
    return await this.client.query(
        // eslint-disable-next-line max-len
        'INSERT INTO records (time, sensor_id, battery_voltage_alert, temperature_alert, abnormal_temperature_alert, humidity_alert, battery_voltage, rssi, temperature, humidity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [
          time, sensorId, batteryVoltageAlert, temperatureAlert,
          abnormalTemperatureAlert, humidityAlert, batteryVoltage,
          rssi, temperature, humidity,
        ],
    );
  };

  /**
   * @param {number} id
   * @return {Promise<*>}
   */
  async getRecord(id) {
    return await this.client.query(
        'SELECT * FROM records WHERE id = $1',
        [id],
    );
  }
};

module.exports = Records;
