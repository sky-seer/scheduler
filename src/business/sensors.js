/**
 * Business Sensors
 */
class Sensors {
  /**
   * @param {Client} client - Postgres client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @param {number} serial
   * @param {number} gatewayId
   * @return {Promise<*>}
   */
  async insertSensorBySerial(serial, gatewayId) {
    return await this.client.query(
        'INSERT INTO sensors (serial_number, gateway_id) VALUES ($1, $2)',
        [serial, gatewayId],
    );
  };

  /**
   * @param {string} serial
   * @return {Promise<*>}
   */
  async getSensorBySerial(serial) {
    return await this.client.query(
        'SELECT * FROM sensors WHERE serial_number = $1',
        [serial],
    );
  }
};

module.exports = Sensors;
