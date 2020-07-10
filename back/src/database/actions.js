import {PowerUps} from './index.js'

export default async function findPowerUp(powerUpNumber) {
  let powerUpObj;
  
  await PowerUps.findOne({ power: `power${powerUpNumber}` }, (err, powerUp) => {
    powerUpObj = powerUp;
  })
  return powerUpObj;
}
