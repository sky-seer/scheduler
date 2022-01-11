const tag = require('./Tag.js');
const gatewaydataraw = require('./GatewayDataRaw.js');
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
    return new gatewaydatadecoded.GatewayDataDecoded(item0, item1, item2);
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
