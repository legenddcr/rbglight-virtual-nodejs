const aliyunIot = require('aliyun-iot-device-sdk');

// 创建设备实例
const device = aliyunIot.device({
  // 激活凭证 这里替换成你自己上一步申请到的激活凭证
  productKey: '<productKey>',
  deviceName: '<deviceName>',
  deviceSecret: '<deviceSecret>',
});

device.on('connect', () => {
  // 连接成功
  console.log('connect successfully');
  // 监听云端消息
  device.serve('property/set', params => {
    console.log('receieve params:', params);
    // 原样上报
    console.log('post props:', params);
    device.postProps(params, err => {
      if (err) {
        return console.log('post error:', err);
      }
      console.log('post successfully!');
    });
  });
});

device.on('error', (err) =>{
  console.log('error', err);
});