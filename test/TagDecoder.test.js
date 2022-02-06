const TagDecoder = require('../src/common/TagDecoder.js');

describe('test TagDecoder convertId', () => {
  test('convertId', () => {
    expect(TagDecoder.convertId('62180983')).toBe(0x62180983);
  });
});

describe('test TagDecoder convertBatteryVoltageAlertStatus', () => {
  test('convertBatteryVoltageAlertStatus', () => {
    expect(TagDecoder.convertBatteryVoltageAlertStatus('80')).toBe(true);
  });
});

describe('test TagDecoder convertTemperatureAlertStatus', () => {
  test('convertTemperatureAlertStatus', () => {
    expect(TagDecoder.convertTemperatureAlertStatus('40')).toBe(true);
  });
});

describe('test TagDecoder convertAbnormalTemperatureStatus', () => {
  test('convertAbnormalTemperatureStatus', () => {
    expect(TagDecoder.convertAbnormalTemperatureStatus('8000')).toBe(true);
  });
});

describe('test TagDecoder convertBatteryVoltage', () => {
  test('convertBatteryVoltage', () => {
    expect(TagDecoder.convertBatteryVoltage('0E33')).toBe(3.635);
  });
});

describe('test TagDecoder convertTemperature', () => {
  test('convertTemperature', () => {
    expect(TagDecoder.convertTemperature('00D4')).toBe(21.2);
  });
});

describe('test TagDecoder convertHumidity', () => {
  test('convertHumidity', () => {
    expect(TagDecoder.convertHumidity('2D')).toBe(45);
  });
});

describe('test TagDecoder convertRssi', () => {
  test('convertRssi', () => {
    expect(TagDecoder.convertRssi('2D')).toBe(-45);
  });
});
