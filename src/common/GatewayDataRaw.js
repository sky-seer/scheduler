/**
* GatewayDataRaw class.
*/
class GatewayDataRaw {
  /**
  * Constructor.
  * @param {number} id gateway data ID.
  * @param {string} rawData gateway hexadecimal raw data.
  * @param {string} date gateway data date.
  */
  constructor(id, rawData, date) {
    this.id = id;
    this.rawData = rawData;
    this.date = date;
  }

  /**
  * prints the data to the console.
  */
  log() {
    console.log(`GatewayDataRaw:\n` +
        `\tData number: ${this.id}\n` +
        `\tData: "${this.rawData}"\n` +
        `\tEmitted: ${this.date}.`);
  }
}

module.exports = GatewayDataRaw;
