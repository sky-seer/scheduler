const fs = require('fs');

/**
 * Class utils
 */
class Utils {
  /**
     * @param {client} client
     */
  constructor(client) {
    this.client = client;
  };

  /**
   * Insert Gateway
   * @param {string} host
   * @return {Promise<any>}
   */
  async insertGateway(host) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/insert/insert_gateway.psql', 'utf8'),
        [host, null],
    );
  }
  /**
   * Get Gateway with host and port
   * @param {string} host
   * @param  {...string|number} args
   * @return {Promise<anyu>}
   */
  async getGatewayByHost(host, ...args) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/select/select_gateway_host.psql', 'utf8'),
        [host, args.join(', ')],
    );
  }

  /**
   * Get Gateway with id
   * @param {string} id
   * @param {string} host
   * @param {...string|number} args
   * @return {Promise<anyu>}
   */
  async getGatewayById(id, ...args) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/select/select_gateway_id.psql', 'utf8'),
        [id, args.join(', ')],
    );
  };

  /**
   * @param {string} imei
   * @param {...string|number} args
   * @return {Promise<any>}
   */
  async getSensorByImei(imei, ...args) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/select/select_sensor_imei.psql', 'utf8'),
        [imei, args.length > 0 ? args.join(', ') : '*'],
    );
  }

  /**
   * @param {...string|number} args
   * @return {Promise<any>}
   */
  async getRecords(...args) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/select/select_record.psql', 'utf8'),
        [args.length > 0 ? args.join(', ') : '*'],
    )
        .then((res) => res.rows.map((row) => row.id));
  };

  /**
   * @param {string} idSonde
   * @param {number} batteryLevel
   * @param {number} rssiSignal
   * @param {number} temperature
   * @param {number} humidity
   * @param {number} time
   * @return {Promise<any>}
   */
  async insertRecord(
      idSonde,
      batteryLevel,
      rssiSignal,
      temperature,
      humidity,
      time,
  ) {
    return this.client.query(
        fs.readFileSync(
            './src/lib/psql-model/insert/insert_record.psql', 'utf8'),
        [idSonde, batteryLevel, rssiSignal, temperature, humidity, time],
    )
        .then((res) => console.log(res));
  };
}

module.exports = Utils;
