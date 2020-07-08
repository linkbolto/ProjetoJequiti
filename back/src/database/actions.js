import {PowerUps} from './index.js'

export default async function findPowerUp(powerUpNumber) {
  let powerUpObj;
  
  await PowerUps.findOne({ power: `power${powerUpNumber}` }, (err, powerUp) => {
    powerUpObj = powerUp;
  })
  console.log(powerUpObj)
  console.log("esse foi do metodo findPowerUp ^")
  return powerUpObj;
}
