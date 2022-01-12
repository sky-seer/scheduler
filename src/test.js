const GatewayDataDecoder = require('./GatewayDataDecoder.js');
const GatewayDataRaw = require('./GatewayDataRaw.js');

// création d'un objet GatewayDataRaw
const testGatewayDataRaw = function() {
  const gatewayDataElement = [
    13873,
    '545A004124240406020400000641884907900004150B0E173B0500000008AAC0000001A404B7001900020B62182233000E5600B8384406182660000E1300B7FF3C010A5EDC0D0A',
    'Thu, 25 Nov 2021 12:04:00 GMT',
  ];

  const gatewayDataRaw = new GatewayDataRaw(
      gatewayDataElement[0],
      gatewayDataElement[1],
      gatewayDataElement[2]);
  const check = gatewayDataRaw.id == gatewayDataElement[0] &&
      gatewayDataRaw.rawData == gatewayDataElement[1] &&
      gatewayDataRaw.date == gatewayDataElement[2];
  console.log('test GatewayDataRaw instanciation: ' +
     (check ? 'Pass' : 'FAILED'));
};


const testGatewayDataDecoder = function() {
  const gatewayDataElement = [
      13873,
      '545A003624240406020000000641884907900001120C0D021D1100000008AAC00000019F04D0000E00010B62180983000E3300D42D2D005129D30D0A',
      'Thu, 25 Nov 2021 12:04:00 GMT',
    ];

  const gatewayDataRaw = new GatewayDataRaw(
      gatewayDataElement[0],
      gatewayDataElement[1],
      gatewayDataElement[2]);

  const gatewayDataDecoded = GatewayDataDecoder.decode(gatewayDataRaw);
  gatewayDataDecoded.log();
//  console.log('test GatewayDataRaw instanciation: ' +
//      (check ? 'Pass' : 'FAILED'));
};

const testGatewayDataDecoderFull = function() {
  const gatewayData = [
    [
      13873,
      '545A004124240406020400000641884907900004150B0E173B0500000008AAC0000001A404B7001900020B62182233000E5600B8384406182660000E1300B7FF3C010A5EDC0D0A',
      'Thu, 25 Nov 2021 12:04:00 GMT',
    ],
    [
      13872,
      '545A004124240406020400000641884907900004150B0E17360100000008AAC0000001A404AF001900020B62182233000E5600B8384406182660000E1300B7FF3B0109DD150D0A',
      'Thu, 25 Nov 2021 11:58:56 GMT',
    ],
    [
      13871,
      '545A004124240406020400000641884907900004150B0E17303800000008AAC0000001A404B6001900020B62182233000E5600B8384506182660000E1300B7FF3B01082D2D0D0A',
      'Thu, 25 Nov 2021 11:53:52 GMT',
    ],
    [
      13870,
      '545A004124240406020400000641884907900004150B0E172B3400000008AAC0000001A404B7001900020B62182233000E5600B9384506182660000E1300B7FF3C0107247F0D0A',
      'Thu, 25 Nov 2021 11:48:48 GMT',
    ],
    [
      13869,
      '545A004124240406020400000641884907900004150B0E17263000000008AAC0000001A404B6001900020B62182233000E5600B9384506182660000E1300B7FF3D010637C40D0A',
      'Thu, 25 Nov 2021 11:43:44 GMT',
    ],
  ];

  const gatewayDataRawArray = [];

  for (let i = 0; i < gatewayData.length; i++) {
    const gatewayDataRaw = new GatewayDataRaw(
        gatewayData[i][0],
        gatewayData[i][1],
        gatewayData[i][2]);
    gatewayDataRawArray.push(gatewayDataRaw);
  }

  const gatewayDataDecodedArray = [];

  for (let i = 0; i < gatewayData.length; i++) {
    const gatewayDataDecoded = GatewayDataDecoder.decode(
        gatewayDataRawArray[i]);
    gatewayDataDecodedArray.push(gatewayDataDecoded);
  }

  for (let i = 0; i < gatewayData.length; i++) {
    gatewayDataDecodedArray[i].log();
  }

//  console.log('test GatewayDataRaw instanciation: ' +
//      (check ? 'Pass' : 'FAILED'));
};

testGatewayDataRaw();
testGatewayDataDecoder();
testGatewayDataDecoderFull();
