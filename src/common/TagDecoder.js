const Tag = require('./Tag.js');

/**
* TagDecoder class.
*/
class TagDecoder {
  /**
  * converts a hexadecimal string to a Tag object.
  * @param {string} tagHexString tag raw data as a hexadecimal string.
  * @return {Tag} tag decoded objet.
  */
  static decode(tagHexString) {
    const id = this.convertId(tagHexString.substring(0, 8));
    const batteryVoltageAlertStatus = this.convertBatteryVoltageAlertStatus(
        tagHexString.substring(8, 10));
    const temperatureAlertStatus = this.convertTemperatureAlertStatus(
        tagHexString.substring(8, 10));
    const abnormalTemperatureStatus = this.convertAbnormalTemperatureStatus(
        tagHexString.substring(14, 18));
    const batteryVoltage = this.convertBatteryVoltage(
        tagHexString.substring(10, 14));
    const temperature = this.convertTemperature(tagHexString.substring(14, 18));
    const humidity = this.convertHumidity(tagHexString.substring(18, 20));
    const humidityAlertStatus = humidity === 0xFF;
    const rssi = this.convertRssi(tagHexString.substring(20, 22));

    return new Tag(id,
        batteryVoltageAlertStatus,
        temperatureAlertStatus,
        abnormalTemperatureStatus,
        humidityAlertStatus,
        batteryVoltage,
        temperature,
        humidity,
        rssi);
  }

  /**
  * converts a hexadecimal string to a Tag ID number.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {number} tag's decoded ID number.
  */
  static convertId(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a Tag's battery voltage alert status.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {boolean} tag's decoded battery voltage alert status.
  */
  static convertBatteryVoltageAlertStatus(hexString) {
    const hexValue = parseInt(hexString, 16);
    return (hexValue & 0x80) === 0x80; // bit 7
  }

  /**
  * converts a hexadecimal string to a Tag's temperature alert status.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {boolean} tag's decoded temperature alert status.
  */
  static convertTemperatureAlertStatus(hexString) {
    const hexValue = parseInt(hexString, 16);
    return (hexValue & 0x40) === 0x40; // bit 6
  }

  /**
  * converts a hexadecimal string to a Tag's abnormal temperature status.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {boolean} tag's decoded abnormal temperature status.
  */
  static convertAbnormalTemperatureStatus(hexString) {
    const hexValue = parseInt(hexString, 16);
    return (hexValue & 0x8000) === 0x8000; // bit 15
  }

  /**
  * converts a hexadecimal string to a Tag's battery voltage.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {number} tag' decoded battery voltage.
  */
  static convertBatteryVoltage(hexString) {
    return parseInt(hexString, 16) / 1000; // mV to V
  }

  /**
  * converts a hexadecimal string to a Tag's temperature.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {number} tag's decoded temperature.
  */
  static convertTemperature(hexString) {
    const hexValue = parseInt(hexString, 16);
    const isNegative = (hexValue & 0x4000) === 0x4000; // bit 14
    const temperature = (hexValue & 0x3FFF) / 10; // bits 0-13
    return isNegative ? -temperature : temperature;
  }

  /**
  * converts a hexadecimal string to a Tag's humidity.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {number} tag's decoded humidity.
  */
  static convertHumidity(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a Tag's RSSI value.
  * @param {string} hexString tag raw data as a hexadecimal string.
  * @return {number} tag's decoded RSSI value.
  */
  static convertRssi(hexString) {
    return -parseInt(hexString, 16);
  }
}

module.exports = TagDecoder;
