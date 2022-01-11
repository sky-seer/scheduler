/**
* GatewayDataDecoded class.
*/
class GatewayDataDecoded {
  /**
  * Constructor.
  * @param {number} id gateway data ID decoded.
  * @param {Date} date gateway data's date.
  * @param {string} startSymbol gateway data's start symbol.
  * @param {number} packetLength gateway data's packet length.
  * @param {string} protocolType gateway data's protocol type.
  * @param {number} hardwareType gateway data's hardware type.
  * @param {number} firmwareVersion gateway data's firmware version.
  * @param {number} imei gateway data's imei serial.
  * @param {number} rtcTime gateway data's RTC time.
  * @param {number} statusDataLength gateway data's status data length.
  * @param {number} alarmType gateway data's alarm type.
  * @param {boolean} isConnectedToPower gateway is connected to power supply.
  * @param {boolean} isLastPacket gateway data's is last packet.
  * @param {number} batteryVoltage gateway's battery voltage.
  * @param {number} powerVoltage gateway's power voltage.
  * @param {number} tagInformationDataLength gateway data's tag \
  * information data length.
  * @param {number} tagType gateway data's tag type.
  * @param {number} tagsNumber gateway data's number of tags.
  * @param {number} tagLength gateway data's tag length.
  * @param {number} packetIndex gateway data's packet index.
  * @param {number} checkCode gateway data's check code.
  * @param {number} stopSymbol gateway data's stop symbol.
  * @param {Tag[]} tags gateway's decoded tags as an array of Tag objects.
  */
  constructor(id,
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
      tags) {
    this.id = id;
    this.date = date;
    this.startSymbol = startSymbol;
    this.packetLength = packetLength;
    this.protocolType = protocolType;
    this.hardwareType = hardwareType;
    this.firmwareVersion = firmwareVersion;
    this.imei = imei;
    this.rtcTime = rtcTime;
    this.statusDataLength = statusDataLength;
    this.alarmType = alarmType;
    this.isConnectedToPower = isConnectedToPower;
    this.isLastPacket = isLastPacket;
    this.batteryVoltage = batteryVoltage;
    this.powerVoltage = powerVoltage;
    this.tagInformationDataLength = tagInformationDataLength;
    this.tagType = tagType;
    this.tagsNumber = tagsNumber;
    this.tagLength = tagLength;
    this.packetIndex = packetIndex;
    this.checkCode = checkCode;
    this.stopSymbol = stopSymbol;
    this.tags = tags;
  }

  /**
  * prints the data to the console.
  */
  log() {
    console.log(`Data number: ${this.id}\n` +
        `Data: "${this.data}"\n` +
        `Emitted: ${this.date}.`);
  }
}
