const tag = require('./Tag.js');
// const gatewaydataraw = require('./GatewayDataRaw.js');
const gatewaydatadecoded = require('./GatewayDataDecoded.js');

/**
* GatewayDataDecoder class.
*/
class GatewayDataDecoder {
  /**
  * converts a GatewayDataRaw object into a GateWayDataDecoded one.
  * @param {gatewaydataraw.GatewayDataRaw} gatewayDataRaw gateway raw data objet.
  * @return {gatewaydatadecoded.GatewayDataDecoded} gateway decoded data objet.
  */
  static convert(gatewayDataRaw) {
    const id = gatewayDataRaw.id;
    const date = gatewayDataRaw.date;
    const rawData = gatewayDataRaw.rawData;
    const rawDataLength = rawData.length;
    const startSymbol = this.convertStartSymbol(rawData.substring(0, 4));
    const packetLength = this.convertPacketLength(rawData.substring(4, 8));
    const protocolType = this.convertProtocolType(rawData.substring(8, 12));
    const hardwareType = this.convertHardwareType(rawData.substring(12, 16));
    const firmwareVersion = this.convertFirmwareVersion(rawData.substring(16, 24));
    const imei = this.convertImei(rawData.substring(24, 40));
    const rtcTime = this.convertRtcTime(rawData.substring(40, 52));
    const statusDataLength = this.convertStatusDataLength(rawData.substring(54, 58));
    const alarmType = this.convertAlarmType(rawData.substring(58, 60));
    const isConnectedToPower = this.convertIsConnectedToPower(rawData.substring(60, 62));
    const isLastPacket = this.convertIsLastPacket(rawData.substring(60, 62));
    const batteryVoltage = this.convertBatteryVoltage(rawData.substring(66, 70));
    const powerVoltage = this.convertPowerVoltage(rawData.substring(70, 74));
    const tagInformationDataLength = this.convertTagInformationDataLength(rawData.substring(74, 78));
    const tagType = this.convertTagType(rawData.substring(78, 80));
    const tagsNumber = this.convertTagsNumber(rawData.substring(80, 82));
    const tagLength = this.convertTagLength(rawData.substring(82, 84));
    const packetIndex = this.convertPacketIndex(rawData.substring(rawDataLength - 12, rawDataLength - 8));
    const checkCode = this.convertCheckCode(rawData.substring(rawDataLength - 8, rawDataLength - 4));
    const stopSymbol = this.convertStopSymbol(rawData.substring(rawDataLength - 4, rawDataLength));
    const rawTagString = rawData.substring(84, rawDataLength - 12);

    return new gatewaydatadecoded.GatewayDataDecoded(id,
        date,
        startSymbol,
        packetLength,
        protocolType,
        hardwareType,
        firmwareVersion,
        imei,
        rtcTime,
        statusDataLength,
        alarmType,
        isConnectedToPower,
        isLastPacket,
        batteryVoltage,
        powerVoltage,
        tagInformationDataLength,
        tagType,
        tagsNumber,
        tagLength,
        packetIndex,
        checkCode,
        stopSymbol,
        tags);
  }

  /**
  * converts a hexadecimal string to a gateway's start symbol.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {string} gateway's decoded start symbol.
  */
  static convertStartSymbol(hexString) {
    const firstCharHex = hexString.substring(0, 2);
    const secondCharHex = hexString.substring(2, 4);
    return hexToChar(firstCharHex) + hexToChar(secondCharHex);
  }

  /**
  * converts a hexadecimal string to a gateway's packet length.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded packet length.
  */
  static convertPacketLength(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's protocol type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {string} gateway's decoded protocol type.
  */
  static convertProtocolType(hexString) {
    const firstCharHex = hexString.substring(0, 2);
    const secondCharHex = hexString.substring(2, 4);
    return hexToChar(firstCharHex) + hexToChar(secondCharHex);
  }

  /**
  * converts a hexadecimal string to a gateway's hardware type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded hardware type.
  */
  static convertHardwareType(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's firmware version.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {string} gateway's decoded firmware version.
  */
  static convertFirmwareVersion(hexString) {
    const firstCharHex = hexString.substring(0, 2);
    const secondCharHex = hexString.substring(2, 4);
    const thirdCharHex = hexString.substring(4, 6);
    const fourthCharHex = hexString.substring(6, 8);
    return parseInt(firstCharHex, 16) + '.' + parseInt(secondCharHex, 16) +
        '.' + parseInt(thirdCharHex, 16) + '.' + parseInt(fourthCharHex, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's IMEI.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded IMEI.
  */
  static convertImei(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's RTC time.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded RTC time.
  */
  static convertRtcTime(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's status data length.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded status data length.
  */
  static convertStatusDataLength(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's alarm type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded alarm type.
  */
  static convertAlarmType(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's connected to power status.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {boolean} gateway's decoded connected to power status.
  */
  static convertIsConnectedToPower(hexString) {
    const hexValue = parseInt(hexString, 16);
    return hexValue & 0x80 == 0x80;
  }

  /**
  * converts a hexadecimal string to a gateway's last packet status.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {boolean} gateway's decoded last packet status.
  */
  static convertIsLastPacket(hexString) {
    const hexValue = parseInt(hexString, 16);
    return hexValue & 0x40 == 0x40;
  }

  /**
  * converts a hexadecimal string to a gateway's battery voltage.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded battery voltage.
  */
  static convertBatteryVoltage(hexString) {
    return parseInt(hexString, 16) / 1000; // mV => V
  }

  /**
  * converts a hexadecimal string to a gateway's power voltage.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded power voltage.
  */
  static convertPowerVoltage(hexString) {
    return parseInt(hexString, 16) / 1000; // mV => V
  }

  /**
  * converts a hexadecimal string to a gateway's tag information data length.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded tag information data length.
  */
  static convertTagInformationDataLength(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's tag type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded tag type.
  */
  static convertTagType(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's tag number.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded tag number.
  */
  static convertTagsNumber(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's tag length.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded tag length.
  */
  static convertTagLength(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's packet index.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded packet index.
  */
  static convertPacketIndex(hexString) {
    number parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's check code.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded check code.
  */
  static convertCheckCode(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's .
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {boolean} gateway's decoded .
  */
  static convertStopSymbol(hexString) {
    const firstCharHex = hexString.substring(0, 2);
    const secondCharHex = hexString.substring(2, 4);
    return hexToChar(firstCharHex) + hexToChar(secondCharHex);
  }

  /**
  * converts a hexadecimal string to a character.
  * @param {string} hexString hexadecimal string.
  * @return {string} character.
  */
  static hexToChar(hexString) {
    return String.fromCharCode(parseInt(hexString, 16));
  }
}
