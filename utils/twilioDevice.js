import { Device } from '@twilio/voice-sdk';
const useTwilio = (token) => {
  console.log('called');
  const device = new Device(token, {
    codecPreferences: ['opus', 'pcmu'],
    fakeLocalDTMF: true,
    enableRingingState: true,
  });

  device.on('ready', function (device) {
    console.log('Twilio.Device Ready!');
  });

  device.on('error', function (error) {
    console.log('Twilio.Device Error: ', error.message);
  });

  device.on('connect', function (conn) {
    console.log('Successfully established call!');
  });

  return device;
};
export default useTwilio;
