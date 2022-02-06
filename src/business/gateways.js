/**
 * Business Gateway
 */
class Gateways {
  /**
   * @param {Client} client - Postgres client
   */
  constructor(client) {
    this.client = client;
  }
  /**
   * @param {string} imei
   * @return {Promise<*>}
   */
  async insertGatewayByImei(imei) {
    return await this.client.query(
        'INSERT INTO gateways (imei) VALUES ($1)',
        [imei],
    );
  }

  /**
   * @param {string} imei
   * @return {Promise<*>}
   */
  async getGatewayByImei(imei) {
    return await this.client.query(
        'SELECT * FROM gateways WHERE imei=$1',
        [imei],
    );
  };

  /**
   * @param {number} gatewayId
   * @param {Date} time
   * @param {string} alarmType
   * @param {boolean} isConnectedToPower
   * @param {number} batteryVoltage
   * @param {number} powerVoltage
   * @return {Promise<*>}
   */
  async insertGatewayStatus(
      gatewayId, time, alarmType, isConnectedToPower,
      batteryVoltage, powerVoltage) {
    return await this.client.query(
        // eslint-disable-next-line max-len
        'INSERT INTO gateways_statuses (gateway_id, time, alarm_type, is_connected_to_power, battery_voltage, power_voltage) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          gatewayId, time, alarmType,
          isConnectedToPower, batteryVoltage, powerVoltage,
        ],
    );
  }

  /**
   * @param {string} imei
   * @return {Promise<*>}
   */
  getGatewayStatus(imei) {
    return this.client.query(
        'SELECT * FROM gateways_statuses WHERE imei = $1',
        [imei],
    );
  }
};

module.exports = Gateways;
