const io = require('socket.io-client');
const express = require('express');
const crypto = require('crypto');
const moment = require('moment');

const BASE_URL = 'http://localhost:3000';
const SOCKET_PATH = '/ws/'

const THIRDFI_API_KEY = '370e2532-c2f0-4d06-aa7d-cfd076cd199b';
const THIRDFI_SEC_KEY = '72cd253cab42a7f716e7714c325e13cda65a043da7b3f80909470cedc20252f5';

const timeStamp = moment().unix();
const baseString = `${BASE_URL}/ws/&emit=price_feed&timestamp=${timeStamp}`;

let hash = crypto.createHmac('sha256', THIRDFI_SEC_KEY).update(baseString).digest('hex');

const socket = io(BASE_URL, {
  path: `/ws/`,
  extraHeaders: {
    'x-sec-key': THIRDFI_API_KEY,
    'x-sec-sign': hash,
    'x-sec-ts': timeStamp,
  },
  transport: ['polling'],
  reconnection: true,   
  autoConnect: true,
});

socket.on('reconnect', () => {
  console.log('reconnected');
});

socket.on('connect', () => {
  // // Listen to Room by Network and its pair

    eth.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'ETH',
        pair: item.pair,
      });
    });
    
    polygon.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'POLYGON',
        pair: item.pair,
      });
    });

    arbitrum.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'ARBITRUM',
        pair: item.pair,
      });
    });

    bnb.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'BNB',
        pair: item.pair,
      });
    });

    avax.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'AVAX',
        pair: item.pair,
      });
    });

    optimism.forEach((item) => {
      socket.emit('joinRoom', {
        network: 'OPTIMISM',
        pair: item.pair,
      });
    });
});

socket.on('joinRoom', async (msg) => {
  const regex = /^POLYGON/;
  if(!regex.test(msg.Pair)) {
    console.log('ROOM', msg);
  }
  // Expected Output
  // ROOM { Answer: 30369.47, Pair: 'BNB-BTCUSD' }
});

socket.on('message', (msg) => {
  console.log('[Message]:', msg);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

const app = express(); 
const args = process.argv.slice(2);
const port = args[0] || 3001;

console.log('port', port);

const optimism = [
  {
    pair: 'BTCUSD',
    address: '0x0C1272d2aC652D10d03bb4dEB0D31F15ea3EAb2b',
    decimals: 8,
  },
  {
    pair: 'ETHUSD',
    address: '0x02f5E9e9dcc66ba6392f6904D5Fcf8625d9B19C9',
    decimals: 8,
  },
  {
    pair: 'BNBUSD',
    address: '0x25dD1949cDb81f5fc38841a8abF342c4EF48dbfd',
    decimals: 8,
  },
  {
    pair: 'ONEUSD',
    address: '0x663ed3D2aB9F8d5282a94BA4636E346e59bDdEB9',
    decimals: 8,
  },
  {
    pair: 'SNXUSD',
    address: '0x584F57911b6EEDab5503E202f8e193663c9bd3DB',
    decimals: 8,
  },
  {
    pair: 'RUNEUSD',
    address: '0x1aafcf49E103a71b31506Cb05FB072ED1B5b0414',
    decimals: 8,
  },
  {
    pair: 'XMRUSD',
    address: '0xDa6fCf88c718eCEB18c2c08A543562b1146F4996',
    decimals: 8,
  },
  {
    pair: 'AAVEUSD',
    address: '0x81cC0c227BF9bFB8088b14755DfcA65f7892203b',
    decimals: 8,
  },
  {
    pair: 'AXSUSD',
    address: '0x7A18889f137B593f4E03C0A698A4360f43d1731c',
    decimals: 8,
  },
  {
    pair: 'FTMUSD',
    address: '0x13f11f2139C10A48eCD7A6A14d804f90b2cFC89A',
    decimals: 8,
  },
  {
    pair: 'SOLUSD',
    address: '0x92C9B9C512759f5D04563eFa3698FC4fbF735d59',
    decimals: 8,
  },
]

const avax = [{
  pair: 'AVAXUSD',
  address: '0x9450A29eF091B625e976cE66f2A5818e20791999',
  decimals: 8,
},
{
  pair: 'BTCUSD',
  address: '0x154baB1FC1D87fF641EeD0E9Bc0f8a50D880D2B6',
  decimals: 8,
},
{
  pair: 'ETHUSD',
  address: '0xEfaa69f461E0aaf0be1798b01371Daf14AC55eA8',
  decimals: 8,
},
{
  pair: 'CRVUSD',
  address: '0xFf6e2c3C9E9a174824a764dbb8222454f6A3ecb1',
  decimals: 8,
},
{
  pair: 'GMXUSD',
  address: '0x3Ec39652e73337350a712Fb418DBb4C2a8247673',
  decimals: 8,
}]

const arbitrum = [          {
  pair: 'ARBUSD',
  address: '0x46de66F10343b59BAcc37dF9b3F67cD0CcC121A3',
  decimals: 8,
},
{
  pair: 'BTCUSD',
  address: '0x942d00008D658dbB40745BBEc89A93c253f9B882',
  decimals: 8,
},
{
  pair: 'ETHUSD',
  address: '0x3607e46698d218B3a5Cae44bF381475C0a5e2ca7',
  decimals: 8,
},
{
  pair: 'BALUSD',
  address: '0x53368bC6a7eB4f4AF3d6974520FEba0295A5daAb',
  decimals: 8,
},
{
  pair: 'COMPUSD',
  address: '0x52df0481c6D2Ad7E50889AFd03C8ddd8413ac63d',
  decimals: 8,
},
{
  pair: 'LINKUSD',
  address: '0x9b8DdcF800a7BfCdEbaD6D65514dE59160a2C9CC',
  decimals: 8,
},
{
  pair: 'YFIUSD',
  address: '0x660e7aF290F540205A84dccC1F40D0269fC936F5',
  decimals: 8,
},
{
  pair: 'FRAXUSD',
  address: '0x5D041081725468Aa43e72ff0445Fde2Ad1aDE775',
  decimals: 8,
},
{
  pair: 'KNCUSD',
  address: '0x20870D99455B6F9d7c0E6f2608245719d789ff53',
  decimals: 8,
},
{
  pair: 'SUSHIUSD',
  address: '0xe4A492420eBdA03B04973Ed1E46d5fe9F3b077EF',
  decimals: 8,
},
{
  pair: 'UNIUSD',
  address: '0xeFc5061B7a8AeF31F789F1bA5b3b8256674F2B71',
  decimals: 8,
}];

const polygon = [{
  pair: 'BTCUSD',
  address: '0x9b489F7Fffa89EA450E3121603e79d9093a9396E',
  decimals: 8,
},
{
  pair: 'ETHUSD',
  address: '0x4dD6655Ad5ed7C06c882f496E3f42acE5766cb89',
  decimals: 8,
},
{
  pair: 'MATICUSD',
  address: '0x1278C74c3B2f8c3BcA0089b4E128fAf023615ECf',
  decimals: 8,
},
{
  pair: 'ALGOUSD',
  address: '0xb54D6F958C3940db47ccfD65125a2A31D9FCb756',
  decimals: 8,
},
{
  pair: 'BNBUSD',
  address: '0xCd16dF514a501596a8E24fE1dC9c9be9c9091285',
  decimals: 8,
},
{
  pair: 'UNIUSD',
  address: '0x166816Cacb15f80badC5cd0cC24D64C8d1D1Cf61',
  decimals: 8,
},
{
  pair: 'ADAUSD',
  address: '0xDe89D2aCf279D1478FF0557318B44A614846f737',
  decimals: 8,
},
{
  pair: 'COMPUSD',
  address: '0x3E2860bfCBc891E8AfD8c191A2A05C58eE7a818e',
  decimals: 8,
},
{
  pair: 'SOLUSD',
  address: '0x37b557Dd3d3552C4DAA4dA935cf5bf2f3d04c8bF',
  decimals: 8,
}]

const bnb = [          {
  pair: 'BTCUSD',
  address: '0x178bA789e24A1d51E9Ea3Cb1Db3B52917963D71D',
  decimals: 8,
},
{
  pair: 'ETHUSD',
  address: '0xfC3069296a691250fFDf21fe51340fdD415a76ed',
  decimals: 8,
},
{
  pair: 'BNBUSD',
  address: '0x137924D7C36816E0DcAF016eB617Cc2C92C05782',
  decimals: 8,
},
{
  pair: 'CAKEUSD',
  address: '0x7935a51aDDaB8550D346FEEf34e02F67C9330109',
  decimals: 8,
},
{
  pair: 'SUSHIUSD',
  address: '0x761Eff952671395708f22c5a7d5673685277A5c3',
  decimals: 8,
},
{
  pair: 'DOTUSD',
  address: '0xe978DaA50D3A8574F139c1e3Fe5D511dDb323BC5',
  decimals: 8,
},
{
  pair: 'AAVEUSD',
  address: '0x7457f14cE4773EBEb1352D2774Ec384a54c2F665',
  decimals: 8,
},
{
  pair: 'BCHUSD',
  address: '0xF78feB6c096117Bfb9283aa1eAc304449E04d374',
  decimals: 8,
},
{
  pair: 'MATICUSD',
  address: '0xeC1Ca9c5Dd897F832CDe3D43BB041f5e01380757',
  decimals: 8,
},
{
  pair: 'SXPUSD',
  address: '0x5ba2B3A2a41141Aa55Fc72C40d6643aEE12BD0B6',
  decimals: 8,
},
{
  pair: 'EOSUSD',
  address: '0x0C1A3fa6Cc1a91F751A9232cC5D6Be9700a93Fc7',
  decimals: 8,
},
{
  pair: 'FILUSD',
  address: '0x8f8289E5CA9a4C867ec7A257b0E9Dd1132093E23',
  decimals: 8,
},
{
  pair: 'SOLUSD',
  address: '0x14E9D15c1EcD428606c443Ed715631b5C444a49e',
  decimals: 8,
},
{
  pair: 'XRPUSD',
  address: '0x5C0F367A778857B36E88B553df132b232AC34901',
  decimals: 8,
},
{
  pair: 'FTTUSD',
  address: '0x122400b06aAC5ba901492035aFC99d3a5C262330',
  decimals: 8,
},
{
  pair: '1INCHUSD',
  address: '0xd690b2CF0D2bcBce51c4cE2dc46E02C508465c5c',
  decimals: 8,
},
{
  pair: 'ATOMUSD',
  address: '0x2e9c2B44D3f5702D2654c20260E8e010656D9777',
  decimals: 8,
},
{
  pair: 'VETUSD',
  address: '0x6297c4cd4002F8c1ECe816dF53D5cdeeead10C25',
  decimals: 8,
}]

const eth = [
  {
    pair: 'BTCUSD',
    address: '0xAe74faA92cB67A95ebCAB07358bC222e33A34dA7',
    decimals: 8,
  },
  {
    pair: 'ETHUSD',
    address: '0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6',
    decimals: 8,
  },
  {
    pair: 'BNBUSD',
    address: '0xC45eBD0F901bA6B2B8C7e70b717778f055eF5E6D',
    decimals: 8,
  },
  {
    pair: 'XRPUSD',
    address: '0x4d839a486EC0B1C9b0D9e9D397993Ba5B150cB34',
    decimals: 8,
  },
  {
    pair: 'AVAXUSD',
    address: '0x0fC3657899693648bbA4dbd2d8b33b82E875105D',
    decimals: 8,
  },
  {
    pair: 'AAVEUSD',
    address: '0xe3f0dEdE4B499c07e12475087AB1A084b5F93bc0',
    decimals: 8,
  },
  {
    pair: 'UNIUSD',
    address: '0x68577f915131087199Fe48913d8b416b3984fd38',
    decimals: 8,
  },
  {
    pair: 'CAKEUSD',
    address: '0x1C026C25271c1bFbA95B65c848F734a23eA62D4e',
    decimals: 8,
  },
  {
    pair: 'MATICUSD',
    address: '0x4B35F7854e1fd8291f4EC714aC3EBB1DeA450585',
    decimals: 8,
  },
  {
    pair: 'DOTUSD',
    address: '0xbE4274DfB7801948e2cc2a913744e9498dDC8d20',
    decimals: 8,
  },
  {
    pair: 'DOGEUSD',
    address: '0x33CCa8E7420114dB103d61bd39A72ff65E46352D',
    decimals: 8,
  },
  {
    pair: 'MKRUSD',
    address: '0x908EDc7E1974Ecab1cA7164424BC4Cac287D83Ad',
    decimals: 8,
  },
  {
    pair: 'SUSHIUSD',
    address: '0xbd6C554554834ee97828B6DA732dCa7461DDf9d4',
    decimals: 8,
  },
  {
    pair: 'SOLUSD',
    address: '0xDf30249744A419891f822ea4a9E80cd76d7Fbd23',
    decimals: 8,
  },
  {
    pair: 'CRVUSD',
    address: '0xb4c4a493AB6356497713A78FFA6c60FB53517c63',
    decimals: 8,
  },
  {
    pair: 'INJUSD',
    address: '0x1a4E4B344125E7ef78de22b55FCeF5a4bc45f605',
    decimals: 8,
  },
  {
    pair: 'NEARUSD',
    address: '0xd9701835dC47837B53D5Cfe95eB5a66f42B56901',
    decimals: 8,
  }
]