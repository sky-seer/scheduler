const GatewayDataDecoder = require('../src/common/GatewayDataDecoder.js');

describe('test GatewayDataDecoder convertStartSymbol', () => {
  test('convertStartSymbol', () => {
    expect(GatewayDataDecoder.convertStartSymbol('545A')).toBe('TZ');
  });
});

describe('test GatewayDataDecoder convertPacketLength', () => {
  test('convertPacketLength', () => {
    expect(GatewayDataDecoder.convertPacketLength('0036')).toBe(54);
  });
});

describe('test GatewayDataDecoder convertProtocolType', () => {
  test('convertProtocolType', () => {
    expect(GatewayDataDecoder.convertProtocolType('2424')).toBe('$$');
  });
});

describe('test GatewayDataDecoder convertHardwareType', () => {
  test('convertHardwareType', () => {
    expect(GatewayDataDecoder.convertHardwareType('0406')).toBe(0x0406);
  });
});

describe('test GatewayDataDecoder convertFirmwareVersion', () => {
  test('convertFirmwareVersion', () => {
    expect(
        GatewayDataDecoder.convertFirmwareVersion('02000000')).toBe('2.0.0.0');
  });
});

describe('test GatewayDataDecoder convertImei', () => {
  test('convertImei', () => {
    expect(
        GatewayDataDecoder.convertImei('0641884907900001'),
    ).toBe('0x0641884907900001');
  });
});

describe('test GatewayDataDecoder convertRtcTime', () => {
  test('convertRtcTime', () => {
    expect(
        GatewayDataDecoder.convertRtcTime('120C0D021D11'),
    ).toBe('2018\\12\\13 02:29:17');
  });
});

describe('test GatewayDataDecoder convertStatusDataLength', () => {
  test('convertStatusDataLength', () => {
    expect(GatewayDataDecoder.convertStatusDataLength('0008')).toBe(8);
  });
});

describe('test GatewayDataDecoder convertAlarmType', () => {
  test('convertAlarmType', () => {
    expect(GatewayDataDecoder.convertAlarmType('AA')).toBe(0xAA);
  });
});

describe('test GatewayDataDecoder convertIsConnectedToPower', () => {
  test('convertIsConnectedToPower', () => {
    expect(GatewayDataDecoder.convertIsConnectedToPower('C0')).toBe(true);
  });
});

describe('test GatewayDataDecoder convertIsLastPacket', () => {
  test('convertIsLastPacket', () => {
    expect(GatewayDataDecoder.convertIsLastPacket('C0')).toBe(true);
  });
});

describe('test GatewayDataDecoder convertBatteryVoltage', () => {
  test('convertBatteryVoltage', () => {
    expect(GatewayDataDecoder.convertBatteryVoltage('019F')).toBe(4.15);
  });
});

describe('test GatewayDataDecoder convertPowerVoltage', () => {
  test('convertPowerVoltage', () => {
    expect(GatewayDataDecoder.convertPowerVoltage('04D0')).toBe(12.32);
  });
});

describe('test GatewayDataDecoder convertTagInformationDataLength', () => {
  test('convertTagInformationDataLength', () => {
    expect(GatewayDataDecoder.convertTagInformationDataLength('000E')).toBe(14);
  });
});

describe('test GatewayDataDecoder convertTagType', () => {
  test('convertTagType', () => {
    expect(GatewayDataDecoder.convertTagType('00')).toBe(0);
  });
});

describe('test GatewayDataDecoder convertTagsNumber', () => {
  test('convertTagsNumber', () => {
    expect(GatewayDataDecoder.convertTagsNumber('01')).toBe(1);
  });
});

describe('test GatewayDataDecoder convertTagLength', () => {
  test('convertTagLength', () => {
    expect(GatewayDataDecoder.convertTagLength('0B')).toBe(0x0B);
  });
});

describe('test GatewayDataDecoder convertPacketIndex', () => {
  test('convertPacketIndex', () => {
    expect(GatewayDataDecoder.convertPacketIndex('0051')).toBe(81);
  });
});

describe('test GatewayDataDecoder convertCheckCode', () => {
  test('convertCheckCode', () => {
    expect(GatewayDataDecoder.convertCheckCode('29D3')).toBe(0x29D3);
  });
});

describe('test GatewayDataDecoder convertStopSymbol', () => {
  test('convertStopSymbol', () => {
    expect(GatewayDataDecoder.convertStopSymbol('0D0A')).toBe(0x0D0A);
  });
});

describe('test GatewayDataDecoder hexToChar', () => {
  test('hexToChar', () => {
    expect(GatewayDataDecoder.hexToChar('54')).toBe('T');
  });
});

